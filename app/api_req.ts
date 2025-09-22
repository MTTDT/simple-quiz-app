export async function getQuestions(fileName: string | null) {
    const res = await fetch(`/api/getQuestions${fileName ? '?topic=' + fileName : ''}`);
  
    return res.json();
 
}
export async function getAnswer(id: number, topic: string | null)  {
    const res = await fetch(`/api/getAnswer?id=${id}&topic=${topic}`);
  
    return res.json();  
} 