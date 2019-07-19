import React, { Component } from "react";

class Html extends Component {
  render() {
    const extraProps = this.props.props;
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{extraProps && extraProps.title}</title>
          <meta
            name="description"
            content={extraProps && extraProps.description}
          />
          <meta
            name="keywords"
            content={extraProps && extraProps.keywords.join(",")}
          />
          <meta name="author" content={extraProps && extraProps.author} />
          {extraProps &&
            extraProps.metas.map(m => {
              let $meta;
              switch (m.name) {
                case "name":
                  $meta = (
                    <meta
                      name={m.type}
                      content={m.content}
                      key={m.type + m.content}
                    />
                  );
                  break;
                case "http-equiv":
                  $meta = (
                    <meta
                      httpEquiv={m.type}
                      content={m.content}
                      key={m.type + m.content}
                    />
                  );
                  break;
                case "itemprop":
                  $meta = (
                    <meta
                      itemprop={m.type}
                      content={m.content}
                      key={m.type + m.content}
                    />
                  );
                  break;
              }
              return $meta;
            })}
          {extraProps &&
            extraProps.links.map(l => {
              return <link rel="stylesheet" href={l.href} key={l.href} />;
            })}
          <style
            dangerouslySetInnerHTML={{ __html: extraProps && extraProps.style }}
          />
        </head>
        <body>
          <div
            id="publishApp"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          <script dangerouslySetInnerHTML={{ __html: this.props.script }} />
          {extraProps &&
            extraProps.scripts.map(s => {
              return <script src={s.src} key={s.src} />;
            })}
          <script
            dangerouslySetInnerHTML={{
              __html: extraProps && extraProps.script
            }}
          />
        </body>
      </html>
    );
  }
}

module.exports =  Html;
