
const fetch = require('node-fetch'); // Using require for script compatibility, assuming node-fetch is available or using global fetch in Node 18+

const BASE_URL = 'http://localhost:3000/api/questions';
const USER_ID = 'dev-mock-user';

async function runTests() {
    console.log('Starting API Verification...');

    // 1. Pagination Test
    console.log('\n[Test 1] Pagination');
    const page1 = await fetchJson(`${BASE_URL}?userId=${USER_ID}&limit=5&page=1`);
    const page2 = await fetchJson(`${BASE_URL}?userId=${USER_ID}&limit=5&page=2`);

    if (page1.questions.length === 5 && page2.questions.length > 0) {
        const ids1 = new Set(page1.questions.map(q => q.id));
        const overlap = page2.questions.some(q => ids1.has(q.id));
        if (!overlap) {
            console.log('✅ Pagination Success: Page 1 and Page 2 have distinct questions.');
        } else {
            console.error('❌ Pagination Fail: Overlap detected.');
        }
    } else {
        console.error(`❌ Pagination Fail: Page 1 length ${page1.questions.length}, Page 2 length ${page2.questions.length}`);
    }

    // 2. Status Filter Test
    console.log('\n[Test 2] Status Filter (matching)');
    const matchingRes = await fetchJson(`${BASE_URL}?userId=${USER_ID}&status=matching`);
    if (matchingRes.questions.length > 0) {
        const allMatching = matchingRes.questions.every(q => q.status === 'matching');
        if (allMatching) {
            console.log(`✅ Status Filter Success: All ${matchingRes.questions.length} items are 'matching'.`);
        } else {
            console.error('❌ Status Filter Fail: Found non-matching status.');
        }
    } else {
        console.warn('⚠️ Status Filter Warning: No matching questions found to test.');
    }

    // 3. Category Filter Test
    // Need a category that exists. 'basic-internal' is common.
    console.log('\n[Test 3] Category Filter (basic-internal)');
    const catRes = await fetchJson(`${BASE_URL}?userId=${USER_ID}&category=basic-internal`);
    if (catRes.questions.length > 0) {
        // Check if distinct categories or single string category contains it
        const allCat = catRes.questions.every(q => {
            const cats = q.categories || (q.category ? [q.category] : []);
            return cats.includes('basic-internal');
        });
        if (allCat) {
            console.log(`✅ Category Filter Success: All ${catRes.questions.length} items contain 'basic-internal'.`);
        } else {
            console.error('❌ Category Filter Fail: Found item without target category.');
        }
    } else {
        console.warn('⚠️ Category Filter Warning: No questions found for basic-internal.');
    }

    // 4. Combined Filter
    console.log('\n[Test 4] Combined Filter (matching + basic-internal)');
    const combinedRes = await fetchJson(`${BASE_URL}?userId=${USER_ID}&status=matching&category=basic-internal`);
    if (combinedRes.questions.length > 0) {
        const valid = combinedRes.questions.every(q => {
            const cats = q.categories || (q.category ? [q.category] : []);
            return q.status === 'matching' && cats.includes('basic-internal');
        });
        if (valid) {
            console.log(`✅ Combined Filter Success: All ${combinedRes.questions.length} items match both criteria.`);
        } else {
            console.error('❌ Combined Filter Fail.');
        }
    } else {
        console.log('ℹ️ Combined Filter: No items found (might be expected if no intersection).');
    }
    // 5. AnsweredBy Filter
    console.log('\n[Test 5] AnsweredBy Filter');
    const ansRes = await fetchJson(`${BASE_URL}?answeredBy=${USER_ID}`);
    if (ansRes.questions.length > 0) {
        console.log(`✅ AnsweredBy Filter Success: Found ${ansRes.questions.length} questions answered by user.`);
    } else {
        console.warn('⚠️ AnsweredBy Filter Warning: No answered questions found (might be 0 in seed, check DB).');
    }
}

async function fetchJson(url) {
    //...
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Status ${res.status}: ${await res.text()}`);
        }
        return await res.json();
    } catch (e) {
        console.error(`Fetch failed for ${url}:`, e.message);
        return { questions: [] };
    }
}

// Check for fetch availability (Node 18+ has it global)
if (!globalThis.fetch) {
    console.warn("Global fetch not found, relying on require('node-fetch') which might fail if not installed. Please run this in an environment with fetch.");
}

runTests();
