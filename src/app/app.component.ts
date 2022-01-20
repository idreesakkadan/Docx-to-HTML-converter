import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import mammoth from 'mammoth.browser';
// import { convertToHtml } from "mammoth/mammoth.browser";
// import {} from 'mammoth/mammoth.browser';
import {convertToHtml} from "mammoth";

import 'mammoth/mammoth.browser';
import { NgxSuneditorComponent } from 'ngx-suneditor';
import { SunEditorOptions } from 'suneditor/src/options';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  html: any;
  copyText: Promise<string> | undefined;
  ngAfterViewInit() {
  }
  title = 'toHML';
  
  private ngxSunEditor!: NgxSuneditorComponent;

  onEditorCreated(comp: NgxSuneditorComponent) {
    // Set the editor that is passed as event payload
    this.ngxSunEditor = comp;
    // Call some method on the Viewchild instance
    // const history = this.ngxSunEditor.getHistory();
    
    // console.log(history); // do your logic ...
    // Get the raw editor object instance
    // console.log(this.html);
    

    const rawEditor = this.ngxSunEditor.getEditor();
    // console.log(rawEditor); // do something wiht the instance
    // this.ngxSunEditor.onResizeEditor(500, 100)
    this.ngxSunEditor.setDefaultStyle('width: 80%; height: 700px;');

  }

  // editorOptions: SunEditorOptions = {
  //   minWidth: "100%",
  //   height: "80vh",
  //   buttonList: [
  //     ["undo", "redo"],
  //     ["font", "fontSize", "formatBlock"],
  //     ["paragraphStyle", "blockquote"],
  //     ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  //     ["fontColor", "hiliteColor", "textStyle"],
  //     ["removeFormat"],
  //     ["outdent", "indent"],
  //     ["align", "horizontalRule", "list", "lineHeight"],
  //     ["table", "link", "image", "video", "audio"],
  //     ["fullScreen", "showBlocks", "codeView"],
  //     ["preview", "print"],
  //     ["save", "template"],
  //   ],
  // };


  htmlSnippet ='';
  fileToUpload: File | null | undefined;

  handleFileInput(event: any) {

    const doc_files = event.target.files;
    const file = doc_files[0];
    console.log((file));

    // const Document = require('extract-word-docs');

    // let document = new Document(file, {editable: true, delText: false});
    
    // document.extractAsHTML().then((data: any) => {
    //     console.log("daaata",data);
    // });
  

    const arrayBuffer: ArrayBuffer =  file.arrayBuffer();
    convertToHtml({arrayBuffer}).then(async (result) => {
      console.log(result.value)
      this.htmlSnippet = result.value;
      let messages = result.messages; //warnings the during conversion
      console.log("warnings",messages);
      
      navigator.clipboard.writeText(this.htmlSnippet);
      this.copyText = navigator.clipboard.readText();
      console.log("from clipboard",this.copyText);

      // navigator.clipboard.readText().then(
      //   clipText => document.querySelector(".editor").innerText += clipText);
      this.ngxSunEditor.insertHTML(await this.copyText)

    });
    // console.log("html2",this.htmlSnippet);

    



  }

  
  onCopy(){
    console.log("copied");
    
  }
}
