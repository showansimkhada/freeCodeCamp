const { request } = require('chai');
const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator');
let translator = new Translator();

suite('Unit Tests', () => {
    // Checking British output
    suite('British', () => {
        // 1. Mangoes are my favorite fruit.
        test("Mangoes are my favorite fruit.", () => {
            assert.match(translator.traTBr("Mangoes are my favorite fruit."), /favourite/)
        })
        // 2. I ate yogurt for breakfast.
        test("I ate yogurt for breakfast.", () => {
            assert.match(translator.traTBr('I ate yogurt for breakfast.'), /yoghurt/)
        })
        // 3. We had a party at my friend's condo.
        test("We had a party at my friend's condo.", () => {
            assert.match(translator.traTBr("We had a party at my friend's condo."), /flat/)
        })
        // 4. Can you toss this in the trashcan for me?
        test("Can you toss this in the trashcan for me?", () => {
            assert.match(translator.traTBr("Can you toss this in the trashcan for me?"), /bin/)
        })
        // 5. The parking lot was full.
        test("The parking lot was full.", () => {
            assert.match(translator.traTBr("The parking lot was full."), /car park/)
        })
        // 6. Like a high tech Rube Goldberg machine.
        test("Like a high tech Rube Goldberg machine.", () => {
            assert.match(translator.traTBr("Like a high tech Rube Goldberg machine."), /Heath Robinson device/)
        })
        // 7. To play hooky means to skip class or work.
        test("To play hooky means to skip class or work.", () => {
            assert.match(translator.traTBr('To play hooky means to skip class or work.'), /bunk off/)
        })
        // 8. No Mr. Bond, I expect you to die.
        test("No Mr. Bond, I expect you to die.", () => {
            assert.match(translator.traTBr("No Mr. Bond, I expect you to die."), /Mr/)
        })
        // 9. Dr. Grosh will see you now.
        test("Dr. Grosh will see you now.", () => {
            assert.match(translator.traTBr("Dr. Grosh will see you now."), /Dr/)
        })
        // 10. Lunch is at 12:15 today.
        test("Lunch is at 12:15 today.", () => {
            assert.match(translator.traTBr("Lunch is at 12:15 today."), /12.15/)
        })
    })

    // Checking American output
    suite('American', () => {
        // 1. We watched the footie match for a while.
        test("We watched the footie match for a while.", () => {
            assert.match(translator.traTAm("We watched the footie match for a while."), /soccer/)
        })
        // 2. Paracetamol takes up to an hour to work.
        test("Paracetamol takes up to an hour to work.", () => {
            assert.match(translator.traTAm("Paracetamol takes up to an hour to work."), /Tylenol/)
        })
        // 3. First, caramelise the onions.
        test("First, caramelise the onions.", () => {
            assert.match(translator.traTAm("First, caramelise the onions."), /caramelize/)
        })
        // 4. I spent the bank holiday at the funfair.
        test("I spent the bank holiday at the funfair.", () => {
            assert.match(translator.traTAm("I spent the bank holiday at the funfair."), /[public holiday]*[carnival]/)
        })
        // 5. I had a bicky then went to the chippy..
        test("I had a bicky then went to the chippy..", () => {
            assert.match(translator.traTAm("I had a bicky then went to the chippy.."), /[cookie]*[fish\-and\-chip shop]/)
        })
        // 6. I've just got bits and bobs in my bum bag.
        test("I've just got bits and bobs in my bum bag.", () => {
            assert.match(translator.traTAm("I've just got bits and bobs in my bum bag."), /[odds and ends]*[fanny pack]/)
        })
        // 7. The car boot sale at Boxted Airfield was called off.
        test("The car boot sale at Boxted Airfield was called off.", () => {
            assert.match(translator.traTAm('The car boot sale at Boxted Airfield was called off.'), /[swap meet]/)
        })
        // 8. Have you met Mrs Kalyani?
        test("Have you met Mrs Kalyani?", () => {
            assert.match(translator.traTAm("Have you met Mrs Kalyani?"), /Mr./)
        })
        // 9. Prof Joyner of King's College, London.
        test("Prof Joyner of King's College, London.", () => {
            assert.match(translator.traTAm("Prof Joyner of King's College, London."), /Prof/)
        })
        // 10. Tea time is usually around 4 or 4.30.
        test("Tea time is usually around 4 or 4.30.", () => {
            assert.match(translator.traTAm("Tea time is usually around 4 or 4.30."), /4:30/)
        })
    })
    // Highlight of translated characters
    suite('Highlight', () => {
        // 1. Mangoes are my favorite fruit.
        test("Mangoes are my favorite fruit.", () => {
            assert.match(translator.traTBr("Mangoes are my favorite fruit."), /[<span class="highlight">]*[</span>]/)
        })
        // 2. I ate yogurt for breakfast.
        test("I ate yogurt for breakfast.", () => {
            assert.match(translator.traTBr("I ate yogurt for breakfast."), /[<span class="highlight">]*[</span>]/)
        })
        // 3. We watched the footie match for a while.
        test("We watched the footie match for a while.", () => {
            assert.match(translator.traTBr("We watched the footie match for a while."), /[<span class="highlight">]*[</span>]/)
        })
        // 4. Paracetamol takes up to an hour to work.
        test("Paracetamol takes up to an hour to work.", () => {
            assert.match(translator.traTBr("Paracetamol takes up to an hour to work."), /[<span class="highlight">]*[</span>]/)
        })
    })
});