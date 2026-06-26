import React from 'react';

interface Props {
  raw: string;
}

function parseInlineContent(text: string): React.ReactNode[] {
  // Matches **bold**, *italic*, and `code`
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="tab-prose__em">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="tab-prose__code">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export function MarkdownContent({ raw }: Props) {
  if (!raw) return null;

  const lines = raw.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let currentListType: 'ul' | 'ol' | null = null;
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      const isOrdered = currentListType === 'ol';
      const Tag = isOrdered ? 'ol' : 'ul';
      const listClass = isOrdered ? 'tab-prose__ol' : 'tab-prose__ul';
      elements.push(
        <Tag key={`list-${listKey++}`} className={listClass}>
          {currentList}
        </Tag>
      );
      currentList = [];
      currentListType = null;
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushList();
      elements.push(<hr key={`hr-${i}`} className="tab-prose__hr" />);
      return;
    }

    // Heading (e.g., #, ##, ###, ####)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const Tag = `h${Math.min(level + 1, 6)}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      elements.push(
        <Tag key={`h-${i}`} className={`tab-prose__h${Tag}`}>
          {parseInlineContent(content)}
        </Tag>
      );
      return;
    }

    // Unordered List Item (e.g. - item, * item, + item)
    const ulMatch = trimmed.match(/^[-*+]\s+(.*)$/);
    if (ulMatch) {
      if (currentListType !== 'ul') {
        flushList();
        currentListType = 'ul';
      }
      currentList.push(
        <li key={`li-${i}`} className="tab-prose__li">
          {parseInlineContent(ulMatch[1])}
        </li>
      );
      return;
    }

    // Ordered List Item (e.g. 1. item, 2. item)
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (currentListType !== 'ol') {
        flushList();
        currentListType = 'ol';
      }
      currentList.push(
        <li key={`li-${i}`} className="tab-prose__li" value={parseInt(olMatch[1], 10)}>
          {parseInlineContent(olMatch[2])}
        </li>
      );
      return;
    }

    // Standard paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="tab-prose__p">
        {parseInlineContent(trimmed)}
      </p>
    );
  });

  flushList();

  return elements.length > 0 ? <div className="tab-prose">{elements}</div> : null;
}
