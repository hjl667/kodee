import { useState, useEffect } from "react";

import "./style.css"

import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export default function MarkdownContent({text}) {
  const [output, setOutput] = useState('');

  useEffect(() => {
    const renderMarkdown = async (text) => {
      const processContent = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(text);

      setOutput(processContent.toString());
    };

    renderMarkdown(text);
  }, [text]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
}

