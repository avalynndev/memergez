export function wrapText(
  ctx: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxHeight: number = Infinity,
  align: "center" | "start" | "end" = "start"
) {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];
  let totalHeight = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line.trim());
      line = words[n] + " ";
      totalHeight += lineHeight;
      if (totalHeight + lineHeight > maxHeight) {
        break;
      }
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  totalHeight = 0;
  for (const element of lines) {
    const lineWidth = ctx.measureText(element).width;
    let xPos = x;

    if (align === "center") {
      xPos = x + (maxWidth - lineWidth) / 2;
    } else if (align === "end") {
      xPos = x + maxWidth - lineWidth;
    }

    if (totalHeight + lineHeight > maxHeight) {
      break;
    }
    ctx.fillText(element, xPos, y + totalHeight);
    totalHeight += lineHeight;
  }
}
