import Document, { Html, Head, Main, NextScript } from "next/document";

class MainDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head ><title> </title></Head>
        <body>
        <Main />
        <NextScript />
        {/*Below we add the modal wrapper*/}
        <div id="overlays"> </div>
        </body>
      </Html>
    );
  }
}

export default MainDocument;
