export default function formatText(content: string) {
  return content.replace(
    /\*([^*]+)\*/g,
    '<span class="text-primary">$1</span>',
  );
}
