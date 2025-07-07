export const fetchData= async ()=>{
    return new Promise(async(resolve) => {
       const response= await fetch('http://localhost:5263/api/customers/') ;
       const result =await response.json();
       resolve(result.products);
    });
}