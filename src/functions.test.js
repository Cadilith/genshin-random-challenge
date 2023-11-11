import { capitalizeFirstLetter } from "./functions";

describe('capitalizeFirstLetter function', ()=>{
    it('should change the first letter to capital', ()=>{
        const result = 'Tiffanie';
        expect(capitalizeFirstLetter('tiffanie')).toEqual(result);
    })
});