import re
import math
import os
from collections import Counter

# Load dictionary words for English vocabulary verification
DICT_WORDS = set()
dict_path = "/usr/share/dict/words"
if os.path.exists(dict_path):
    try:
        with open(dict_path, "r", encoding="utf-8", errors="ignore") as f:
            DICT_WORDS = set(line.strip().lower() for line in f if len(line.strip()) > 1)
    except Exception:
        pass

# Fallback common words if system dictionary is unavailable
FALLBACK_WORDS = {
    "i", "we", "you", "they", "he", "she", "it", "my", "our", "your", "their", "this", "that",
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "from", "by",
    "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did",
    "want", "need", "looking", "require", "promote", "promotion", "film", "movie", "short", "music",
    "song", "album", "artist", "brand", "branding", "website", "web", "app", "application", "mobile",
    "development", "design", "creative", "media", "marketing", "production", "budget", "pricing", "cost",
    "quote", "timeline", "urgent", "hire", "project", "proposal", "launch", "campaign", "producer",
    "rookie", "individual", "company", "startup", "business", "help", "support", "services", "team"
}
COMMON_WORDS = DICT_WORDS if len(DICT_WORDS) > 1000 else FALLBACK_WORDS

# High-value domain keywords
MEDIA_KEYWORDS = {
    "film", "movie", "cinema", "short", "documentary", "teaser", "trailer", "poster",
    "music", "song", "track", "album", "ep", "artist", "singer", "musician", "band",
    "actor", "performer", "model", "producer", "director", "script", "shoot", "shooting",
    "brand", "branding", "identity", "publicity", "pr", "media", "ott", "entertainment",
    "podcast", "influencer", "youtube", "instagram", "creator", "content", "video"
}

TECH_KEYWORDS = {
    "website", "web", "app", "application", "ios", "android", "portal", "platform",
    "development", "developer", "software", "ui", "ux", "design", "redesign",
    "ai", "automation", "dashboard", "ecommerce", "store", "features", "custom"
}

COMMERCIAL_INTENT_KEYWORDS = {
    "budget", "cost", "price", "pricing", "quote", "quotation", "proposal",
    "hire", "contract", "retainer", "package", "fees", "rates", "invoice",
    "launch", "deadline", "timeline", "urgent", "start", "starting", "immediately",
    "discuss", "call", "meeting", "meet", "schedule", "connect", "collaborate", "partnership"
}

NEGATIVE_KEYWORDS = {
    "job", "vacancy", "intern", "internship", "career", "careers", "resume", "cv",
    "hiring me", "apply for job", "looking for job", "give job", "salary",
    "free", "cheap", "no money", "unpaid", "sample test", "test 123", "asdf"
}

def clean_message(text: str) -> str:
    """Removes form boilerplate headers like 'Service: ...' and 'Project details:'"""
    cleaned = re.sub(r'Service:\s*.*?\n', '', text, flags=re.IGNORECASE)
    cleaned = re.sub(r'Project details:\s*', '', cleaned, flags=re.IGNORECASE).strip()
    return cleaned

def calculate_entropy(text: str) -> float:
    """Calculates Shannon entropy to detect repetitive or uniform character mash"""
    if not text:
        return 0.0
    counter = Counter(text.lower())
    length = len(text)
    return -sum((count / length) * math.log2(count / length) for count in counter.values())

def detect_gibberish(raw_text: str):
    """
    Returns (is_gibberish: bool, reason: str)
    Detects random keystroke sequences like 'asdaDNJKWAJENDA', 'asdfasdf', 'qweqwr'
    """
    cleaned = clean_message(raw_text)
    if not cleaned or len(cleaned.strip()) < 4:
        return True, "Message is virtually empty or too short."

    # Extract alphabetical words
    words = re.findall(r'[a-zA-Z]+', cleaned)
    if not words:
        return True, "No alphabetical words detected."

    # Check for common keyboard row sequences
    keyboard_patterns = [r'asdf', r'hjkl', r'zxcv', r'qwer', r'1234', r'abcd']
    for pattern in keyboard_patterns:
        if re.search(pattern, cleaned.lower()) and len(words) <= 3:
            return True, "Keyboard pattern mash detected."

    # Analyze words for valid dictionary presence
    valid_words = [w.lower() for w in words if w.lower() in COMMON_WORDS]
    valid_ratio = len(valid_words) / len(words)

    # If message has <= 3 words and 0 are valid English words -> Definitely gibberish
    if len(words) <= 3 and len(valid_words) == 0:
        return True, f"Unrecognized random text: '{cleaned}'"

    # For longer messages, if valid word ratio is below 35%
    if len(words) > 3 and valid_ratio < 0.35:
        return True, f"High concentration of non-dictionary terms ({valid_ratio:.0%} recognized)."

    # Check for unnatural consonant clusters (e.g., 'DNJKWAJENDA', 'strpzx')
    vowels = set('aeiouyAEIOUY')
    for w in words:
        if len(w) >= 7:
            # Check consecutive consonants
            if re.search(r'[bcdfghjklmnpqrstvwxyz]{5,}', w.lower()):
                return True, f"Unnatural consonant cluster in word: '{w}'"
            v_count = sum(1 for c in w if c in vowels)
            if (v_count / len(w)) < 0.15:
                return True, f"Abnormal vowel ratio in word: '{w}'"

    return False, "Valid"

def evaluate_lead(message: str, source: str = "contact_form", name: str = "", email: str = "", phone: str = ""):
    """
    Evaluates a lead and returns a comprehensive score from 0 to 100 with explanation.
    """
    is_gib, reason = detect_gibberish(message)
    if is_gib:
        return {
            "ai_score": 5,
            "intent_level": "Spam / Gibberish",
            "reason": f"Flagged as invalid input: {reason}",
            "is_valid": False
        }

    cleaned = clean_message(message).lower()
    words = [w.lower() for w in re.findall(r'[a-zA-Z]+', cleaned)]
    word_count = len(words)

    score = 0
    factors = []

    # 1. Message Substance & Detail (Max 25 pts)
    if word_count >= 25:
        score += 25
        factors.append("Extensive project explanation (+25)")
    elif word_count >= 15:
        score += 20
        factors.append("Solid project detail (+20)")
    elif word_count >= 8:
        score += 15
        factors.append("Moderate message detail (+15)")
    elif word_count >= 4:
        score += 10
        factors.append("Short description (+10)")
    else:
        score += 5
        factors.append("Minimal message length (+5)")

    # 2. Domain Interest (Film, Music, Web, App, Media, Branding) (Max 30 pts)
    matched_media = [w for w in MEDIA_KEYWORDS if w in cleaned]
    matched_tech = [w for w in TECH_KEYWORDS if w in cleaned]

    domain_matches = len(matched_media) + len(matched_tech)
    if domain_matches >= 3:
        score += 30
        factors.append(f"Strong domain focus: {matched_media[:2] + matched_tech[:2]} (+30)")
    elif domain_matches >= 1:
        score += 20
        factors.append(f"Relevant domain keywords: {matched_media[:2] + matched_tech[:2]} (+20)")

    # 3. Commercial & Conversion Intent (Budget, Timeline, Proposal, Launch) (Max 25 pts)
    matched_commercial = [w for w in COMMERCIAL_INTENT_KEYWORDS if w in cleaned]
    if len(matched_commercial) >= 2:
        score += 25
        factors.append(f"High buying intent keywords: {matched_commercial[:3]} (+25)")
    elif len(matched_commercial) == 1:
        score += 15
        factors.append(f"Commercial intent keyword: {matched_commercial[0]} (+15)")

    # 4. Contact Details Quality (Max 20 pts)
    if phone and phone != "Not provided" and len(re.findall(r'\d', phone)) >= 10:
        score += 12
        factors.append("Verified phone number provided (+12)")

    if email and "@" in email:
        domain = email.split("@")[-1].lower()
        if domain not in {"gmail.com", "yahoo.com", "outlook.com", "hotmail.com"}:
            score += 8
            factors.append("Corporate/custom domain email (+8)")
        else:
            score += 5
            factors.append("Standard email provided (+5)")

    # 5. Negative Intent / Irrelevance Penalties
    matched_negative = [w for w in NEGATIVE_KEYWORDS if w in cleaned]
    if matched_negative:
        score -= 40
        factors.append(f"Job inquiry or non-client penalty: {matched_negative} (-40)")

    # Clamp final score between 5 and 99
    final_score = max(5, min(99, score))

    if final_score >= 85:
        intent_level = "Priority Lead (High Intent)"
    elif final_score >= 70:
        intent_level = "Qualified Lead"
    elif final_score >= 45:
        intent_level = "General Enquiry"
    else:
        intent_level = "Low Intent / Cold Lead"

    return {
        "ai_score": final_score,
        "intent_level": intent_level,
        "reason": "; ".join(factors),
        "is_valid": True
    }
