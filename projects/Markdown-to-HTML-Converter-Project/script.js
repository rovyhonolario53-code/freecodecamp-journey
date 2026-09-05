const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');

function convertMarkdown() {
    let text = markdownInput.value;

    // 1. Convert Images
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');


    // 2. Convert Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // 3. Convert Headings (Level 3 -> Level 2 -> Level 1)
    text = text.replace(/^\s*### (.*)$/gm, '<h3>$1</h3>');
    text = text.replace(/^\s*## (.*)$/gm, '<h2>$1</h2>');
    text = text.replace(/^\s*# (.*)$/gm, '<h1>$1</h1>');

    // 4. Convert Blockquotes
    text = text.replace(/^\s*> (.*)$/gm, '<blockquote>$1</blockquote>');

    // 5. Convert Bold Text
    text = text.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

    // 6. Convert Italic Text
    text = text.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

    return text;
}

markdownInput.addEventListener('input', () => {
    const convertedHtml = convertMarkdown();
    htmlOutput.textContent = convertedHtml;
    preview.innerHTML = convertedHtml;
});