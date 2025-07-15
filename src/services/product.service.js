import fs from 'fs/promises';
const filePath = './data/products.json';

async function readData(){

    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);

}

async function writeData(data){
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
export const getAllproducts = ()=>{
    return readData();
};