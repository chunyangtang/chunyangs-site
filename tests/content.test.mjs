import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const readPage = (path) => readFileSync(join(dist, path), 'utf8');
const publicationIds = ['ai-agent-eye-clinic', 'nanophotonics-optical-computing'];

test('both publications have detail pages and links from the profile', () => {
  const profile = readPage('profile/index.html');
  for (const id of publicationIds) {
    assert.ok(profile.includes(`href="/publications/${id}"`), `Profile must link to ${id}`);
    const article = readPage(`publications/${id}/index.html`);
    assert.ok(article.includes('My role'));
    assert.ok(article.includes('Media coverage'));
    assert.ok(article.includes('href="/profile#publications"'));
    assert.ok(article.includes('<strong class="font-semibold text-gray-900 dark:text-gray-100">Chunyang Tang</strong>'));
    assert.match(article, /<meta name="description" content="[^"]+"/);
  }
});

test('only the opted-in project gets a detail page', () => {
  const listing = readPage('projects/index.html');
  assert.ok(listing.includes('href="/projects/clinical-ai-platform"'));
  const detail = readPage('projects/clinical-ai-platform/index.html');
  assert.ok(detail.includes('href="https://github.com/Tsinghua-AI-TEC"'));
  for (const id of ['personal-website', 'macos-software']) {
    assert.equal(existsSync(join(dist, 'projects', id, 'index.html')), false);
    assert.equal(listing.includes(`href="/projects/${id}"`), false);
  }
  assert.ok(listing.includes('https://github.com/chunyangtang/chunyangs-site'));
  assert.ok(listing.includes('https://chunyangtang.notion.site/macOS-'));
});

test('blog migration preserves both article URLs, images, and math rendering', () => {
  const listing = readPage('blog/index.html');
  for (const id of ['build-site', 'first-post']) {
    assert.ok(listing.includes(`href="/blog/${id}"`));
    assert.match(readPage(`blog/${id}/index.html`), /<img[^>]+src="\/_astro\//);
  }
  assert.ok(readPage('index.html').includes('href="/blog/build-site"'));
  assert.ok(readPage('blog/first-post/index.html').includes('class="katex"'));
  assert.equal(listing.includes('/index.md'), false);
});

test('all six supplied media links are retained with exact destinations', () => {
  const nano = readPage('publications/nanophotonics-optical-computing/index.html');
  const clinic = readPage('publications/ai-agent-eye-clinic/index.html');
  for (const url of [
    'https://www.peopleapp.com/column/30053131990-500007695594',
    'https://mp.weixin.qq.com/s/haMMjIGRJlB1OSBw8htO0g',
    'https://mp.weixin.qq.com/s/Iq08mO5_mgPVDkKCRFUCPQ',
    'https://mp.weixin.qq.com/s/DfV6XNsHNjmVqiqy62Kh2A',
  ]) assert.ok(nano.includes(`href="${url}"`), url);
  for (const url of [
    'https://www.sciencealert.com/china-just-let-ai-run-an-eye-clinic-heres-what-happened',
    'https://mp.weixin.qq.com/s/vyN4WmRLanBHyWb_OMGPVg',
  ]) assert.ok(clinic.includes(`href="${url}"`), url);
});

function htmlFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : [];
  });
}

test('generated pages contain no broken local links, image URLs, or fragment targets', () => {
  for (const path of htmlFiles(dist)) {
    const html = readFileSync(path, 'utf8');
    for (const match of html.matchAll(/(?:href|src)="(\/[^"\s]*|#[^"\s]*)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), 'https://site.test');
      if (url.host !== 'site.test') continue;
      let target = match[1].startsWith('#') ? path : join(dist, decodeURIComponent(url.pathname));
      if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
      assert.ok(existsSync(target), `${path}: missing target ${match[1]}`);
      if (url.hash && target.endsWith('.html')) {
        const fragment = decodeURIComponent(url.hash.slice(1));
        assert.ok(readFileSync(target, 'utf8').includes(`id="${fragment}"`), `${path}: missing fragment ${match[1]}`);
      }
    }
  }
});
