import { http, HttpResponse } from "msw";
import { mockBook } from "./mockBook";
import { mockBulkError } from "./mockBulkError";
import { mockBulkUploadList } from "./mockBulkUploadList";
import { mockBookList } from "./mockBookList";

export const handlers = [
  http.get(`http://localhost:5000/api/books/:bookId`, ({ params }) => {
    const { bookId } = params;

    if(bookId==="validBookId")
      return HttpResponse.json({book : mockBook});
    else 
      return HttpResponse.error()
  }),

  http.post(`http://localhost:5000/api/books`, async ({ request }) => {
    const newMockBook = await request.json();
    return HttpResponse.json(newMockBook);
  }),

  http.patch(`http://localhost:5000/api/books/:bookId`, async ({ params }) => {
    const {bookId} = params;
    if(bookId==="validBookId"){
      const newMockBook = await request.json();
      return HttpResponse.json(newMockBook);
    }
    else{
      return HttpResponse.error();
    }
    
  }),

  http.get("http://localhost:5000/api/bulk-uploads-errors/:session_id", ({params})=>{
    const {session_id} = params;
    return HttpResponse.json(mockBulkError)
  }),

  http.get(`http://localhost:5000/api/bulk-uploads-list`, ()=>{
    return HttpResponse.json({bulkUploads : mockBulkUploadList});
  }),

  http.get(`http://localhost:5000/api/search`, ({request})=>{
    const url = new URL(request.url);
    const query = url.searchParams
    if(query.has("invalidQuery")) return HttpResponse.error();
    else return HttpResponse.json({books : mockBookList});
  }),

  http.post('http://localhost:5000/api/bulk-upload', async ({ request }) => {
    const data = await request.formData()
    const file = data.get('file')
 
    if (!file) {
      return new HttpResponse('Missing document')
    }
 
    if (!(file instanceof File)) {
      return new HttpResponse('Uploaded document is not a File')
    }
 
    return HttpResponse.json("file uploaded")
  }),

];
