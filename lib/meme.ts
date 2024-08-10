import fetch from "node-fetch";

class Meme {
  private base: string;

  constructor() {
    this.base = "https://memer-api-js.vercel.app/api/v4";
  }

  async vr(text: string) {
    if (!text) throw new SyntaxError("You are missing the Text");

    try {
      const response = await fetch(`${this.base}/vr?text=${encodeURI(text)}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(arrayBuffer)).toString(
        "base64"
      );
      return buffer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default Meme;
