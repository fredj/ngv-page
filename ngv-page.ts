import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";

@customElement("ngv-page")
export class NgvPage extends LitElement {
  @query(".banner") banner: HTMLElement;
  @query(".header") header: HTMLElement;
  private observer: ResizeObserver;

  static styles = css`
    :host {
      display: block;
      /* box-sizing: border-box; */
      height: 100%;
      width: 100%;
    }

    .base {
      /* min-height: 100%;
        width: 100%; */
      display: grid;
      grid-template-rows: repeat(3, minmax(0, auto)) minmax(0, 1fr) minmax(
          0,
          auto
        );
      grid-template-columns: 100%;
      grid-template-areas:
        "banner"
        "header"
        "body"
        "footer";
    }
    .banner {
      grid-area: banner;
      top: 0;
    }
    .header {
      grid-area: header;
      top: var(--banner-height);
    }
    .banner,
    .header {
      position: sticky;
    }
    .body {
      grid-area: body;
      /* min-height: 100%;
        height: 100%; */
      display: grid;
      /* align-items: flex-start; */
      grid-template-columns: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
      grid-template-rows: minmax(0, 1fr);
      grid-template-areas: "menu main aside";
    }
    .main {
      min-height: 100%;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
      grid-template-areas:
        "main-header"
        "main-content"
        "main-footer";
    }
    .menu {
      grid-area: menu;
    }
    .aside {
      grid-area: aside;
    }
    .menu,
    .aside {
      position: sticky;
      top: calc(var(--banner-height) + var(--header-height));
      height: calc(100dvh - var(--header-height) - var(--banner-height));
      max-height: calc(100dvh - var(--header-height) - var(--banner-height));
      overflow: auto;
    }
    .main-header {
      grid-area: main-header;
    }
    .main-content {
      grid-area: main-content;
    }
    .main-footer {
      grid-area: main-footer;
    }
    .aside {
      grid-area: aside;
    }
    .footer {
      grid-area: footer;
    }
  `;

  constructor() {
    super();
    this.observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // FIXME
        this.style.setProperty(
          `--${entry.target.className}-height`,
          `${entry.borderBoxSize[0].blockSize}px`
        );
      }
    });
  }

  protected render() {
    return html`
      <div class="base">
        <div class="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="body">
          <div class="menu">
            <slot name="menu"></slot>
          </div>
          <div class="main">
            <div class="main-header">
              <slot name="main-header"></slot>
            </div>
            <div class="main-content">
              <slot name="main-content"></slot>
            </div>
            <div class="main-footer">
              <slot name="main-footer"></slot>
            </div>
          </div>
          <div class="aside">
            <slot name="aside"></slot>
          </div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.observer.observe(this.banner);
    this.observer.observe(this.header);
    // FIXME: unobserve
  }
}
