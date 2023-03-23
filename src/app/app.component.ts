import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {convertToHtml} from "mammoth";
import 'mammoth/mammoth.browser';
import { NgxSuneditorComponent } from 'ngx-suneditor';

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
  title = 'DocxtoHML';
  
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

  htmlSnippet ='';

  handleFileInput(event: any) {
    this.ngxSunEditor.showLoading()
    var reader = new FileReader();


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

      // copy text from clipboard otherwise it will change the alignments
      navigator.clipboard.writeText(this.htmlSnippet);
      this.copyText = navigator.clipboard.readText();
      console.log("from clipboard",this.copyText);

      // navigator.clipboard.readText().then(
      //   clipText => document.querySelector(".editor").innerText += clipText);
      this.ngxSunEditor.insertHTML(await this.copyText)
      this.ngxSunEditor.closeLoading()

    });
    // console.log("html2",this.htmlSnippet);

  }

  
  onCopy(){
    console.log("copied");
    
  }

  resetForm(event: any) {
    window.location.reload();
    
    this.htmlSnippet = '';
    this.ngxSunEditor.insertHTML(this.htmlSnippet)
    this.ngxSunEditor.setContents('')
    
  }
}
