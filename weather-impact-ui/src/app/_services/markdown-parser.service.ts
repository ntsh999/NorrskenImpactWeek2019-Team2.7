import { Injectable } from '@angular/core';
import * as marked from 'marked';
@Injectable()
export class MarkdownParserService {

  private md;
  constructor() {
    this.md = marked;
  }
  convertMdtoHtml(text: string) {
    return this.md.parse(text);
  }

}
