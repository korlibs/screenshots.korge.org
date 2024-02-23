#!/usr/bin/env -S deno run -A
// npx puppeteer browsers install chrome
import puppeteer from 'npm:puppeteer'

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function screenshot(page: puppeteer.Page, filename: string, url: string, script: ((() => void) | undefined) = undefined) {
    console.log(`Taking screenshot for '${url}'`)
    await page.goto(url);
    await timeout(3000)
    if (script) {
        await page.evaluate(script)
    }
    await page.screenshot({path: filename});
    console.log(`  -> done: ${filename}`)
}

declare const document: any

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: 'dark'}]);
    
    await page.setViewport({width: 1280, height: 720})
    await screenshot(page, 'stars.png', 'https://star-history.com/embed?secret=#korlibs/korge&Date', () => { })

    await page.setViewport({width: 1280, height: 1280})
    await screenshot(page, 'sprint.png', 'https://github.com/orgs/korlibs/projects/19/views/23', () => { document.querySelector('header')?.remove() })
    await screenshot(page, 'roadmap.png', 'https://github.com/orgs/korlibs/projects/19/views/22', () => { document.querySelector('header')?.remove() })
    await screenshot(page, 'discussions.png', 'https://github.com/korlibs/korge/discussions', () => { document.querySelector('header')?.remove() })
    await screenshot(page, 'dokka.png', 'https://dokka.korge.org/korge/index.html', () => { document.querySelector('header')?.remove() })
    await screenshot(page, 'root.png', 'https://korge.org/', () => { document.querySelector('#carbonads')?.remove() })
    await screenshot(page, 'docs.png', 'https://docs.korge.org/', () => { document.querySelector('#carbonads')?.remove() })
    await screenshot(page, 'blog.png', 'https://blog.korge.org/', () => { document.querySelector('#carbonads')?.remove() })
    await screenshot(page, 'store.png', 'https://store.korge.org/', () => { document.querySelector('#carbonads')?.remove() })
    browser.close();
    Deno.exit(0)
})();
