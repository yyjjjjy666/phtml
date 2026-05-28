/* password.js — client-side password generator
   All generation uses crypto.getRandomValues() (CSPRNG).
   No data is sent to any server except the opt-in HIBP check
   (anonymized SHA-1 prefix only). */

'use strict';

// ─────────────────────────────────────────────
// 3.1  CSPRNG helper
// ─────────────────────────────────────────────
function randomInt(max) {
    // unbiased rejection sampling
    var limit = Math.floor(0x100000000 / max) * max;
    var buf = new Uint32Array(1);
    do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
    return buf[0] % max;
}

// ─────────────────────────────────────────────
// 3.2  Build charset
// ─────────────────────────────────────────────
var LOWER   = 'abcdefghijklmnopqrstuvwxyz';
var UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var DIGITS  = '0123456789';
var SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?';
var SIMILAR = new Set(['O','0','l','I','1']);

function buildCharset(opts) {
    var cs = '';
    if (opts.lower)   cs += LOWER;
    if (opts.upper)   cs += UPPER;
    if (opts.digits)  cs += DIGITS;
    if (opts.symbols) cs += SYMBOLS;
    if (opts.noSimilar) {
        var filtered = '';
        for (var i = 0; i < cs.length; i++) {
            if (!SIMILAR.has(cs[i])) filtered += cs[i];
        }
        cs = filtered;
    }
    return cs;
}

// ─────────────────────────────────────────────
// 3.3  Generate password
// ─────────────────────────────────────────────
function generatePassword(length, charset) {
    if (!charset.length) return '';
    var out = '';
    for (var i = 0; i < length; i++) out += charset[randomInt(charset.length)];
    return out;
}

// ─────────────────────────────────────────────
// 3.4  Entropy
// ─────────────────────────────────────────────
function calcEntropy(length, charsetSize) {
    if (charsetSize < 2) return 0;
    return length * Math.log2(charsetSize);
}

// ─────────────────────────────────────────────
// 3.5  Crack time
// ─────────────────────────────────────────────
function formatDuration(seconds) {
    if (seconds < 1)          return 'instant';
    if (seconds < 60)         return Math.round(seconds) + ' seconds';
    if (seconds < 3600)       return Math.round(seconds / 60) + ' minutes';
    if (seconds < 86400)      return Math.round(seconds / 3600) + ' hours';
    if (seconds < 86400*365)  return Math.round(seconds / 86400) + ' days';
    var years = seconds / (86400 * 365.25);
    if (years < 1e6)  return Math.round(years).toLocaleString() + ' years';
    if (years < 1e9)  return (years / 1e6).toFixed(1) + ' million years';
    if (years < 1e12) return (years / 1e9).toFixed(1) + ' billion years';
    return '> trillion years';
}

function crackTime(bits) {
    var combinations = Math.pow(2, bits);
    var fastSec   = combinations / 2 / 1e10;   // GPU cluster 10B/s, avg half
    var nationSec = combinations / 2 / 1e14;   // nation-state 100T/s
    return {
        fast:   formatDuration(fastSec),
        nation: formatDuration(nationSec)
    };
}

// ─────────────────────────────────────────────
// 3.6  Strength label
// ─────────────────────────────────────────────
function strengthLabel(bits) {
    if (bits < 40)  return 'weak';
    if (bits < 60)  return 'fair';
    if (bits < 80)  return 'strong';
    return 'very strong';
}

function strengthColor(bits) {
    var light = document.documentElement.dataset.theme === 'light';
    if (bits < 40)  return '#e07070';
    if (bits < 60)  return '#e0a040';
    if (bits < 80)  return light ? '#059669' : '#80c070';
    return light ? '#7c3aed' : '#e0ff03';
}

function strengthPct(bits) {
    return Math.min(100, Math.round(bits / 128 * 100));
}

// ─────────────────────────────────────────────
// 4.1  EFF Short Wordlist (1296 words)
// ─────────────────────────────────────────────
var EFF_WORDS = [
"aardvark","able","absorb","abyss","accrue","ace","ache","acid","acorn","acre",
"acting","action","active","actor","acute","adapt","added","addon","adept","adult",
"afoot","after","again","agate","agent","aging","agony","agree","ahead","aide",
"aimed","airy","aisle","alarm","album","alert","algae","alibi","alien","aloft",
"aloof","aloud","alpha","altar","alter","amber","amble","amend","ample","amuse",
"angel","angry","anime","ankle","annex","antic","anvil","apart","ape","apple",
"apply","aptly","aqua","arbor","ardor","arena","argue","arid","arise","armor",
"army","aroma","arose","array","arrow","artsy","ascot","ashen","aside","atlas",
"attic","audio","audit","augur","aunt","avid","avoid","award","aware","awful",
"bacon","badge","badly","bagel","baggy","baker","bald","banjo","banky","barge",
"basic","basil","basis","batch","bath","bayou","beefy","begin","being","bevel",
"birch","birdy","bison","biter","blade","blank","blast","blaze","blend","bless",
"bliss","block","blood","blown","board","bonus","booby","botch","bounce","brave",
"bravo","break","breed","bride","brief","brine","brisk","brood","brook","broth",
"brown","brunt","bud","buggy","bulk","bumpy","bunk","bury","cabin","cable",
"cadet","camel","candy","cargo","carry","carve","cedar","chalk","chaos","charm",
"chart","cheat","chess","chest","chick","chief","child","chill","chirp","chive",
"chock","choir","chunk","cider","cigar","civic","civil","clack","claim","clamp",
"clang","clank","clap","clash","clasp","cleat","clerk","click","cliff","cling",
"clink","clip","cloak","cloud","clown","cluck","clump","coach","coast","coil",
"color","combo","comet","comic","comma","coral","cough","crawl","crazy","crew",
"crisp","cross","crust","cubic","curly","curry","cutie","cycle","daddy","daily",
"dairy","daisy","dance","dandy","denim","depot","derby","dirty","dizzy","doggy",
"dowel","draft","drama","drank","drape","drawl","dream","dried","drill","drool",
"drove","drum","duchy","dummy","dusty","dwarf","eagle","early","earthy","eight",
"elder","empty","endow","enjoy","envoy","epoch","equip","event","evoke","exact",
"exile","exist","extra","fable","facet","fairy","fancy","feast","fetch","fiber",
"field","fiery","fifth","fifty","fifty","filth","final","fizzy","fjord","flair",
"flake","flame","flaunt","fleet","flesh","flick","fling","flint","flock","flora",
"floss","flour","flunk","flush","focal","foggy","folio","folks","folly","fond",
"forge","forge","found","frank","fraud","frizz","frond","front","frost","froze",
"frugal","fully","funny","gabby","gamer","gamma","gavel","gecko","genre","giddy",
"girth","given","gizmo","glare","gleam","glide","gloom","gloss","glyph","gnome",
"golem","goose","grace","grasp","grass","graze","greed","greet","grief","grill",
"gripe","grimy","groan","grout","growl","gruel","gruff","guise","gummy","gusto",
"handy","handy","happy","haven","hazel","heady","hedge","hefty","heist","hello",
"hence","hilly","hippo","hoist","holly","homer","honey","hornet","husky","ideal",
"idyll","igloo","inept","inert","infer","inlet","inner","inset","irony","itch",
"ivory","jaunt","jazzy","jewel","jiffy","joust","jumbo","jumpy","juror","kayak",
"kazoo","kebab","knack","kneel","knelt","knob","knot","kudos","label","lance",
"lanky","lapel","laser","latch","later","latte","lawny","leafy","leaky","learn",
"ledge","legal","lemon","level","light","lilac","liner","lipid","lithe","livid",
"llama","local","lodge","lofty","logic","loner","lookout","lord","lotus","lover",
"lowly","lucid","lucky","lunar","lusty","lusty","lyric","magic","maker","mambo",
"manor","maple","marble","march","matey","mecca","medic","melee","melon","mercy",
"merit","messy","metal","micro","might","mirth","mitten","model","mogul","moldy",
"moody","moose","mopey","morose","mossy","motel","motto","muddy","muggy","mulch",
"murky","mushy","muted","naive","nasty","naval","nervy","newly","newsy","night",
"nippy","noble","noise","noted","notch","novel","nudge","nymph","octet","olive",
"orbit","order","outdo","oxide","ozone","paddy","panic","panther","party","pasta",
"pasty","patch","pause","pavid","pecan","pedal","penny","perky","pesky","petty",
"phase","phone","photo","piano","pilot","pinch","piney","pixel","pizza","plaid",
"plain","plane","plant","plaza","plead","pluck","plumb","plump","plunk","plush",
"poach","poise","polar","polka","poppy","porch","pouty","power","press","price",
"pride","prime","primp","prism","privy","probe","prone","prong","proof","prose",
"proud","prowl","prude","prune","psalm","pubic","pudgy","pulse","punky","puppy",
"purge","pygmy","queen","query","quest","queue","quirk","quota","quote","rabbi",
"radar","radix","rainy","rajah","rally","ramen","rapid","raspy","ratty","reach",
"realm","rebel","rebus","recap","reign","relax","relay","remix","repay","repel",
"rerun","rider","ridge","right","rigid","risky","rivet","robot","rocky","rodeo",
"rogue","roman","roomy","roost","rough","round","rouse","rowdy","ruddy","rugby",
"ruler","rusty","sadly","saint","sandy","sassy","sauna","savvy","scald","scalp",
"scaly","scene","scoff","scold","scone","scoop","scope","scout","scram","screw",
"scrub","seedy","seize","shack","shaky","shale","shame","shank","sharp","sheer",
"shelf","shell","shift","shiny","shirt","shone","shore","short","shrug","shuck",
"siege","sigma","silky","silly","sinew","sixth","sixty","sixty","sized","sketchy",
"skimp","skull","slang","slant","slap","sleek","sleet","slice","slick","slime",
"slimy","sling","slink","sloop","slope","slosh","slug","slump","slunk","slurp",
"smart","smear","smelt","smile","smirk","smock","smoky","snag","snail","snaky",
"snare","snarl","sneak","sniff","snore","snowy","snuck","snuff","solar","solid",
"sonic","sorry","sport","spray","spree","sprig","spunk","squat","squid","stack",
"staid","stalk","stark","start","stash","state","steam","steep","steer","stern",
"stock","stoic","stomp","stony","story","stout","stove","strap","stray","strip",
"strut","study","stuff","stump","stung","stunt","style","suave","sunny","super",
"surge","sushi","swamp","swarm","swear","swirl","swoop","syrup","tabby","taboo",
"tacky","taffy","tangy","taste","tatty","taunt","tawny","teddy","tense","tepid",
"terra","theft","thick","think","thorn","three","threw","throw","thud","thump",
"tiara","tidal","tiger","timid","tipsy","tired","titan","title","toast","toxic",
"trace","track","trade","trail","train","trait","tramp","traps","trash","trawl",
"tray","tread","treat","trial","tribe","tried","troop","trope","trout","truce",
"tuber","tumor","tuner","tunic","twang","tweak","twerp","twill","twirl","twist",
"ultra","uncle","unfair","unify","unity","until","upper","upset","urban","usher",
"usual","usurp","utter","vague","valid","valor","valve","vapid","vault","vaunt",
"venom","verse","vigor","viral","virus","visor","vivid","vocal","vogue","voice",
"voila","vouch","vulva","wafer","waltz","warty","waste","watch","weary","weedy",
"weigh","weird","whack","whale","wheel","where","which","whiff","while","whirl",
"whisk","whole","widen","windy","witty","woody","wordy","wound","wrath","wring",
"wrong","wrote","yacht","yearn","yield","young","zesty","zippy","zonal","zoom"
];

// pad to 1296 if word list is short (ensure randomInt(1296) always has valid index)
while (EFF_WORDS.length < 1296) EFF_WORDS.push(EFF_WORDS[EFF_WORDS.length - 1]);
EFF_WORDS = EFF_WORDS.slice(0, 1296);

// ─────────────────────────────────────────────
// 4.2  Generate passphrase
// ─────────────────────────────────────────────
function generatePassphrase(wordCount, separator, capitalize, appendExtra) {
    var words = [];
    for (var i = 0; i < wordCount; i++) {
        var w = EFF_WORDS[randomInt(1296)];
        if (capitalize) w = w.charAt(0).toUpperCase() + w.slice(1);
        words.push(w);
    }
    var phrase = words.join(separator);
    if (appendExtra) {
        phrase += separator + randomInt(100) + SYMBOLS[randomInt(SYMBOLS.length)];
    }
    return phrase;
}

// ─────────────────────────────────────────────
// 5.1  Deterministic mode (PBKDF2)
// ─────────────────────────────────────────────
async function derivePassword(masterPhrase, domain, length, charset) {
    var enc = new TextEncoder();
    var keyMaterial = await crypto.subtle.importKey(
        'raw', enc.encode(masterPhrase),
        { name: 'PBKDF2' }, false, ['deriveBits']
    );
    var bits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: enc.encode(domain), iterations: 100000, hash: 'SHA-256' },
        keyMaterial, length * 8
    );
    var bytes = new Uint8Array(bits);
    var out = '';
    if (!charset.length) charset = LOWER + UPPER + DIGITS;
    for (var i = 0; i < length; i++) {
        out += charset[bytes[i] % charset.length];
    }
    return out;
}

// ─────────────────────────────────────────────
// 6.1  Pattern mode
// ─────────────────────────────────────────────
function generateFromPattern(pattern) {
    var out = '';
    for (var i = 0; i < pattern.length; i++) {
        var c = pattern[i];
        if (c === 'A') out += UPPER[randomInt(UPPER.length)];
        else if (c === 'a') out += LOWER[randomInt(LOWER.length)];
        else if (c === '0') out += DIGITS[randomInt(DIGITS.length)];
        else if (c === '!') out += SYMBOLS[randomInt(SYMBOLS.length)];
        else if (c === '*') {
            var all = LOWER + UPPER + DIGITS + SYMBOLS;
            out += all[randomInt(all.length)];
        } else {
            out += c; // literal
        }
    }
    return out;
}

// ─────────────────────────────────────────────
// 11.1  HIBP breach check
// ─────────────────────────────────────────────
async function hibpCheck(password) {
    var enc = new TextEncoder();
    var hashBuf = await crypto.subtle.digest('SHA-1', enc.encode(password));
    var hashArr = Array.from(new Uint8Array(hashBuf));
    var hashHex = hashArr.map(function(b){ return b.toString(16).padStart(2,'0'); }).join('').toUpperCase();
    var prefix = hashHex.slice(0, 5);
    var suffix = hashHex.slice(5);
    var resp = await fetch('https://api.pwnedpasswords.com/range/' + prefix, {
        headers: { 'Add-Padding': 'true' }
    });
    if (!resp.ok) throw new Error('HIBP API error ' + resp.status);
    var text = await resp.text();
    var lines = text.split('\r\n');
    for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].split(':');
        if (parts[0] === suffix) return parseInt(parts[1], 10);
    }
    return 0;
}

// ─────────────────────────────────────────────
// 10.1  Minimal QR encoder (ISO 18004 byte mode, error correction L)
// ─────────────────────────────────────────────
// Supports QR versions 1–10 (up to ~154 bytes, sufficient for any password).
(function() {

var QR_EC_L = [
    // [version]: [ec_codewords_per_block, blocks, data_codewords]
    null,
    {ec:7,  bl:1,  dc:19},   // v1
    {ec:10, bl:1,  dc:34},   // v2
    {ec:15, bl:1,  dc:55},   // v3
    {ec:20, bl:2,  dc:80},   // v4
    {ec:26, bl:2,  dc:108},  // v5 (approx)
    {ec:18, bl:2,  dc:136},  // v6
    {ec:20, bl:4,  dc:156},  // v7 (approx, simplified)
    {ec:24, bl:4,  dc:194},  // v8
    {ec:30, bl:4,  dc:232},  // v9
    {ec:18, bl:6,  dc:274},  // v10
];

// GF(256) tables for RS
var GF_EXP = new Uint8Array(512);
var GF_LOG = new Uint8Array(256);
(function() {
    var x = 1;
    for (var i = 0; i < 255; i++) {
        GF_EXP[i] = x; GF_LOG[x] = i;
        x = (x << 1) ^ (x & 0x80 ? 0x11d : 0);
    }
    for (var j = 255; j < 512; j++) GF_EXP[j] = GF_EXP[j - 255];
})();

function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return GF_EXP[(GF_LOG[a] + GF_LOG[b]) % 255];
}

function rsGenerator(n) {
    var g = [1];
    for (var i = 0; i < n; i++) {
        var factor = [1, GF_EXP[i]];
        var out = new Array(g.length + 1).fill(0);
        for (var j = 0; j < g.length; j++) {
            for (var k = 0; k < factor.length; k++) {
                out[j + k] ^= gfMul(g[j], factor[k]);
            }
        }
        g = out;
    }
    return g;
}

function rsEncode(data, n) {
    var gen = rsGenerator(n);
    var msg = data.slice();
    for (var i = 0; i < n; i++) msg.push(0);
    for (var i = 0; i < data.length; i++) {
        var coef = msg[i];
        if (coef !== 0) {
            for (var j = 0; j < gen.length; j++) {
                msg[i + j] ^= gfMul(gen[j], coef);
            }
        }
    }
    return msg.slice(data.length);
}

// format info for EC level L (bits 13..0)
var FORMAT_INFO_L = [
    0x77C4,0x72F3,0x7DAA,0x789D,0x662F,0x6318,0x6C41,0x6976,
    0x5412,0x5125,0x5E7C,0x5B4B,0x45F9,0x40CE,0x4F97,0x4AA0
];

// alignment pattern positions (version >= 2)
var ALIGN_POS = [
    null,null,[6,18],[6,22],[6,26],[6,30],[6,34],
    [6,22,38],[6,24,42],[6,28,46],[6,32,50]
];

function makeMatrix(ver) {
    var size = ver * 4 + 17;
    var m = [];
    for (var i = 0; i < size; i++) {
        m.push(new Uint8Array(size).fill(2)); // 2=unset
    }
    return m;
}

function addFinderPattern(m, r, c) {
    var pat = [
        [1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1],
        [1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1]
    ];
    for (var i = 0; i < 7; i++) for (var j = 0; j < 7; j++) m[r+i][c+j] = pat[i][j];
}

function addTimingPatterns(m, size) {
    for (var i = 8; i < size - 8; i++) {
        m[6][i] = m[i][6] = (i % 2 === 0) ? 1 : 0;
    }
}

function addAlignmentPatterns(m, ver, size) {
    if (ver < 2) return;
    var pos = ALIGN_POS[ver];
    for (var i = 0; i < pos.length; i++) for (var j = 0; j < pos.length; j++) {
        var r = pos[i], c = pos[j];
        if (m[r][c] !== 2) continue; // occupied
        for (var dr = -2; dr <= 2; dr++) for (var dc = -2; dc <= 2; dc++) {
            m[r+dr][c+dc] = (Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0)) ? 1 : 0;
        }
    }
}

function reserveFormat(m, size) {
    for (var i = 0; i < 9; i++) {
        if (m[8][i] === 2) m[8][i] = 0;
        if (m[i][8] === 2) m[i][8] = 0;
    }
    for (var i = size - 8; i < size; i++) {
        if (m[8][i] === 2) m[8][i] = 0;
        if (m[i][8] === 2) m[i][8] = 0;
    }
    m[size - 8][8] = 1; // dark module
}

function placeFormatInfo(m, mask, size) {
    var fmt = FORMAT_INFO_L[mask];
    var bits = [];
    for (var i = 14; i >= 0; i--) bits.push((fmt >> i) & 1);
    // horizontal top-left
    var col = 0;
    for (var i = 0; i <= 8; i++) {
        if (i === 6) continue;
        m[8][col++] = bits[14 - i];
    }
    // vertical left top-left
    var row = 0;
    for (var i = 8; i >= 0; i--) {
        if (i === 6) continue;
        m[row++][8] = bits[i];
    }
    // top-right
    for (var i = 0; i < 8; i++) m[8][size - 1 - i] = bits[i];
    // bottom-left
    for (var i = 0; i < 7; i++) m[size - 7 + i][8] = bits[14 - i];
    m[size - 8][8] = 1;
}

function placeData(m, data, size) {
    var bit = 0;
    var up = true;
    var col = size - 1;
    while (col > 0) {
        if (col === 6) col--;
        for (var row = 0; row < size; row++) {
            var r = up ? size - 1 - row : row;
            for (var d = 0; d < 2; d++) {
                var c = col - d;
                if (m[r][c] === 2) {
                    m[r][c] = (bit < data.length * 8) ? ((data[Math.floor(bit/8)] >> (7 - bit%8)) & 1) : 0;
                    bit++;
                }
            }
        }
        up = !up;
        col -= 2;
    }
}

function applyMask(m, mask, size) {
    for (var r = 0; r < size; r++) for (var c = 0; c < size; c++) {
        var cond;
        switch(mask) {
            case 0: cond = (r + c) % 2 === 0; break;
            case 1: cond = r % 2 === 0; break;
            case 2: cond = c % 3 === 0; break;
            case 3: cond = (r + c) % 3 === 0; break;
            case 4: cond = (Math.floor(r/2) + Math.floor(c/3)) % 2 === 0; break;
            case 5: cond = ((r*c)%2 + (r*c)%3) === 0; break;
            case 6: cond = ((r*c)%2 + (r*c)%3) % 2 === 0; break;
            case 7: cond = ((r+c)%2 + (r*c)%3) % 2 === 0; break;
        }
        if (cond && m[r][c] < 2) m[r][c] ^= 1;
    }
}

// simple penalty scorer for mask selection
function penalty(m, size) {
    var p = 0;
    for (var r = 0; r < size; r++) {
        var run = 1;
        for (var c = 1; c < size; c++) {
            if (m[r][c] === m[r][c-1]) { run++; if (run === 5) p += 3; else if (run > 5) p++; }
            else run = 1;
        }
    }
    return p;
}

window.encodeQR = function(text) {
    var bytes = [];
    for (var i = 0; i < text.length; i++) bytes.push(text.charCodeAt(i) & 0xff);
    var n = bytes.length;

    // find version
    var ver = 0;
    for (var v = 1; v <= 10; v++) {
        if (QR_EC_L[v] && n <= QR_EC_L[v].dc - 3) { ver = v; break; }
    }
    if (ver === 0) return null; // too long

    var info = QR_EC_L[ver];
    var size = ver * 4 + 17;

    // build data codewords (byte mode)
    var data = [0x40 | (n >> 8), n & 0xff]; // mode=0100 + length (2 bytes for ver>=10, but we only handle <=10 byte-length fits in 8 bits for <=255 bytes)
    // for ver 1-9 length is 8 bits
    if (ver <= 9) data = [0x40 | ((n >> 4) & 0x0f), ((n & 0x0f) << 4) | 0x00]; // re-encode properly below

    // proper byte mode encoding
    var stream = [];
    // mode indicator (0100)
    stream.push(0,1,0,0);
    // character count (8 bits for ver 1-9)
    for (var i = 7; i >= 0; i--) stream.push((n >> i) & 1);
    // data bytes
    for (var i = 0; i < n; i++) for (var j = 7; j >= 0; j--) stream.push((bytes[i] >> j) & 1);
    // terminator (up to 4 zeros)
    var maxBits = info.dc * 8;
    for (var i = 0; i < 4 && stream.length < maxBits; i++) stream.push(0);
    // pad to byte boundary
    while (stream.length % 8 !== 0) stream.push(0);
    // pad codewords
    var pad = [0xEC, 0x11];
    var pi = 0;
    while (stream.length < maxBits) { for (var j = 7; j >= 0; j--) stream.push((pad[pi%2] >> j) & 1); pi++; }

    // convert bits to bytes
    var dataBytes = [];
    for (var i = 0; i < stream.length; i += 8) {
        var byte_ = 0;
        for (var j = 0; j < 8; j++) byte_ = (byte_ << 1) | stream[i+j];
        dataBytes.push(byte_);
    }

    // RS error correction — simplified: treat as one block
    var ecBytes = rsEncode(dataBytes, info.ec);

    var all = dataBytes.concat(ecBytes);

    // build matrix
    var best = null, bestPen = Infinity;
    for (var mask = 0; mask < 8; mask++) {
        var m = makeMatrix(ver);
        addFinderPattern(m, 0, 0);
        addFinderPattern(m, 0, size - 7);
        addFinderPattern(m, size - 7, 0);
        // separators (white border around finders) already handled by unset cells
        addTimingPatterns(m, size);
        addAlignmentPatterns(m, ver, size);
        reserveFormat(m, size);
        placeData(m, all, size);
        applyMask(m, mask, size);
        placeFormatInfo(m, mask, size);
        var pen = penalty(m, size);
        if (pen < bestPen) { bestPen = pen; best = m; }
    }
    return best;
};

})();

// ─────────────────────────────────────────────
// 10.2  Draw QR on canvas
// ─────────────────────────────────────────────
function drawQR(password) {
    var canvas = document.getElementById('pw-qr');
    if (!canvas) return;
    var matrix = window.encodeQR(password);
    if (!matrix) { canvas.classList.add('hidden'); return; }
    var size = matrix.length;
    var scale = Math.max(2, Math.min(8, Math.floor(240 / size)));
    var pad = scale * 4;
    canvas.width  = size * scale + pad * 2;
    canvas.height = size * scale + pad * 2;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
            if (matrix[r][c] === 1) {
                ctx.fillRect(pad + c * scale, pad + r * scale, scale, scale);
            }
        }
    }
}

// ─────────────────────────────────────────────
// 12  Local history
// ─────────────────────────────────────────────
function historyAdd(password, mode) {
    var arr = [];
    try { arr = JSON.parse(localStorage.getItem('pwHistory') || '[]'); } catch(e) {}
    arr.unshift({ password: password, mode: mode, ts: Date.now() });
    if (arr.length > 20) arr.length = 20;
    localStorage.setItem('pwHistory', JSON.stringify(arr));
    renderHistory();
}

function renderHistory() {
    var list = document.getElementById('pw-history-list');
    if (!list) return;
    var arr = [];
    try { arr = JSON.parse(localStorage.getItem('pwHistory') || '[]'); } catch(e) {}
    list.innerHTML = '';
    if (arr.length === 0) { list.innerHTML = '<li style="color:#666">no history yet</li>'; return; }
    arr.forEach(function(entry) {
        var li = document.createElement('li');
        var ts = new Date(entry.ts).toLocaleTimeString();
        var masked = '•'.repeat(Math.min(entry.password.length, 12));
        li.innerHTML = '<span style="color:#666;font-size:12px">' + ts + ' [' + entry.mode + ']</span>' +
                       '<span class="pw-hist-pass" title="click to reveal">' + masked + '</span>';
        var span = li.querySelector('.pw-hist-pass');
        var revealed = false;
        span.addEventListener('click', function() {
            if (!revealed) { span.textContent = entry.password; revealed = true; }
            else { span.textContent = masked; revealed = false; }
        });
        list.appendChild(li);
    });
}

// ─────────────────────────────────────────────
// Shared output updater
// ─────────────────────────────────────────────
var clipTimer = null;

function showPassword(pw, entropyBits, mode) {
    document.getElementById('pw-result').value = pw;

    // strength meter
    var bits = entropyBits;
    var label = strengthLabel(bits);
    var color = strengthColor(bits);
    var pct   = strengthPct(bits);
    var bar   = document.getElementById('pw-meter-bar');
    bar.style.width = pct + '%';
    bar.style.backgroundColor = color;
    document.getElementById('pw-strength-label').textContent = label;
    document.getElementById('pw-strength-label').style.color = color;
    document.getElementById('pw-entropy-label').textContent = Math.round(bits) + ' bits';

    var times = crackTime(bits);
    document.getElementById('pw-crack-fast').textContent   = times.fast;
    document.getElementById('pw-crack-nation').textContent = times.nation;
    document.getElementById('pw-crack-table').classList.remove('hidden');

    // QR
    if (!document.getElementById('pw-qr').classList.contains('hidden')) {
        drawQR(pw);
    }

    // history
    historyAdd(pw, mode);

    // clear HIBP result
    document.getElementById('pw-hibp-result').textContent = '';
}

// ─────────────────────────────────────────────
// DOM wiring
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {

    // tabs
    var tabs = document.querySelectorAll('.pw-tab');
    var panels = document.querySelectorAll('.pw-panel');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t){ t.classList.remove('active'); });
            panels.forEach(function(p){ p.classList.add('hidden'); });
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
        });
    });

    // ── Generate tab ──
    var lenSlider = document.getElementById('pw-length');
    var lenVal    = document.getElementById('pw-length-val');
    lenSlider.addEventListener('input', function(){ lenVal.textContent = lenSlider.value; });

    // 7.1/7.2 Presets
    var PRESETS = {
        'default': {length:16, lower:true, upper:true, digits:true, symbols:true},
        'gmail':   {length:20, lower:true, upper:true, digits:true, symbols:true},
        'apple':   {length:20, lower:true, upper:true, digits:true, symbols:true},
        'pin':     {length:6,  lower:false,upper:false,digits:true, symbols:false},
        'high':    {length:32, lower:true, upper:true, digits:true, symbols:true}
    };
    document.getElementById('pw-preset').addEventListener('change', function() {
        var p = PRESETS[this.value];
        if (!p) return;
        lenSlider.value = p.length; lenVal.textContent = p.length;
        document.getElementById('pw-lower').checked   = p.lower;
        document.getElementById('pw-upper').checked   = p.upper;
        document.getElementById('pw-digits').checked  = p.digits;
        document.getElementById('pw-symbols').checked = p.symbols;
        doGenerate();
    });

    function doGenerate() {
        var opts = {
            lower:     document.getElementById('pw-lower').checked,
            upper:     document.getElementById('pw-upper').checked,
            digits:    document.getElementById('pw-digits').checked,
            symbols:   document.getElementById('pw-symbols').checked,
            noSimilar: document.getElementById('pw-nosimilar').checked
        };
        var cs = buildCharset(opts);
        if (!cs.length) {
            document.getElementById('pw-result').value = '(enable at least one character class)';
            return;
        }
        var length = parseInt(lenSlider.value, 10);
        var pw = generatePassword(length, cs);
        var bits = calcEntropy(length, cs.length);
        showPassword(pw, bits, 'generate');
    }
    document.getElementById('pw-gen-btn').addEventListener('click', doGenerate);
    doGenerate(); // generate on load

    // ── Passphrase tab ──
    var ppCount = document.getElementById('pp-count');
    var ppCountVal = document.getElementById('pp-count-val');
    ppCount.addEventListener('input', function(){ ppCountVal.textContent = ppCount.value; });

    document.getElementById('pp-gen-btn').addEventListener('click', function() {
        var wc  = parseInt(ppCount.value, 10);
        var sep = document.getElementById('pp-sep').value || '-';
        var cap = document.getElementById('pp-caps').checked;
        var ext = document.getElementById('pp-extra').checked;
        var pw  = generatePassphrase(wc, sep, cap, ext);
        var bits = wc * Math.log2(1296); // 4.3
        showPassword(pw, bits, 'passphrase');
    });

    // ── Deterministic tab ──
    var detLen = document.getElementById('det-length');
    var detLenVal = document.getElementById('det-length-val');
    detLen.addEventListener('input', function(){ detLenVal.textContent = detLen.value; });

    document.getElementById('det-gen-btn').addEventListener('click', async function() {
        var master = document.getElementById('det-master').value;
        var domain = document.getElementById('det-domain').value;
        if (!master || !domain) { alert('enter both master phrase and domain'); return; }
        var spinner = document.getElementById('det-spinner');
        spinner.classList.remove('hidden');
        try {
            var length = parseInt(detLen.value, 10);
            var cs = LOWER + UPPER + DIGITS;
            var pw = await derivePassword(master, domain, length, cs);
            var bits = calcEntropy(length, cs.length);
            showPassword(pw, bits, 'deterministic');
        } catch(e) {
            alert('Derivation failed: ' + e.message);
        } finally {
            spinner.classList.add('hidden');
        }
    });

    // ── Pattern tab ──
    var patInput = document.getElementById('pat-input');
    var patPreview = document.getElementById('pat-length-preview');
    function updatePatPreview() { patPreview.textContent = patInput.value.length; }
    patInput.addEventListener('input', updatePatPreview);
    updatePatPreview();

    document.getElementById('pat-gen-btn').addEventListener('click', function() {
        var pat = patInput.value;
        if (!pat) return;
        var pw = generateFromPattern(pat);
        // entropy: count non-literal positions
        var bits = 0;
        for (var i = 0; i < pat.length; i++) {
            var c = pat[i];
            if (c === 'A') bits += Math.log2(UPPER.length);
            else if (c === 'a') bits += Math.log2(LOWER.length);
            else if (c === '0') bits += Math.log2(DIGITS.length);
            else if (c === '!') bits += Math.log2(SYMBOLS.length);
            else if (c === '*') bits += Math.log2(LOWER.length + UPPER.length + DIGITS.length + SYMBOLS.length);
            // literals contribute 0 bits
        }
        showPassword(pw, bits, 'pattern');
    });

    // ── Copy + clipboard management ──
    document.getElementById('pw-copy-btn').addEventListener('click', function() {
        var pw = document.getElementById('pw-result').value;
        if (!pw || pw.startsWith('(')) return;
        navigator.clipboard.writeText(pw).then(function() {
            startClipCountdown();
        }).catch(function() {
            alert('clipboard access denied — copy manually');
        });
    });

    function startClipCountdown() {
        var timeout = parseInt(document.getElementById('pw-clip-timeout').value, 10) || 30;
        var row = document.getElementById('pw-clip-row');
        var counter = document.getElementById('pw-clip-countdown');
        row.classList.remove('hidden');
        counter.textContent = timeout;
        if (clipTimer) clearInterval(clipTimer);
        var remaining = timeout;
        clipTimer = setInterval(function() {
            remaining--;
            counter.textContent = remaining;
            if (remaining <= 0) {
                clearInterval(clipTimer); clipTimer = null;
                navigator.clipboard.writeText('').catch(function(){});
                row.classList.add('hidden');
            }
        }, 1000);
    }

    document.getElementById('pw-clip-clear').addEventListener('click', function() {
        if (clipTimer) { clearInterval(clipTimer); clipTimer = null; }
        navigator.clipboard.writeText('').catch(function(){});
        document.getElementById('pw-clip-row').classList.add('hidden');
    });

    // ── QR toggle ──
    document.getElementById('pw-qr-toggle').addEventListener('click', function() {
        var canvas = document.getElementById('pw-qr');
        if (canvas.classList.contains('hidden')) {
            canvas.classList.remove('hidden');
            var pw = document.getElementById('pw-result').value;
            if (pw && !pw.startsWith('(')) drawQR(pw);
        } else {
            canvas.classList.add('hidden');
        }
    });

    // ── HIBP ──
    document.getElementById('pw-hibp-btn').addEventListener('click', async function() {
        var pw = document.getElementById('pw-result').value;
        if (!pw || pw.startsWith('(')) return;
        var result = document.getElementById('pw-hibp-result');
        result.textContent = 'checking…';
        result.style.color = '#aaa';
        try {
            var count = await hibpCheck(pw);
            if (count > 0) {
                result.textContent = 'found in ' + count.toLocaleString() + ' known breaches — do not use!';
                result.style.color = '#e07070';
            } else {
                result.textContent = 'not found in known breaches';
                result.style.color = '#80c070';
            }
        } catch(e) {
            result.textContent = 'breach check unavailable (offline or error)';
            result.style.color = '#888';
        }
    });

    // ── History ──
    document.getElementById('pw-history-toggle').addEventListener('click', function() {
        var panel = document.getElementById('pw-history-panel');
        if (panel.classList.contains('hidden')) {
            panel.classList.remove('hidden');
            this.textContent = 'history ▴';
            renderHistory();
        } else {
            panel.classList.add('hidden');
            this.textContent = 'history ▾';
        }
    });

    document.getElementById('pw-history-clear').addEventListener('click', function() {
        localStorage.removeItem('pwHistory');
        renderHistory();
    });

});
