import React from 'react'

export default function useFormateDate() {

      function formateDate(dateString){
        const d = new Date(dateString);
        const day = d.getDay();
        const month = d.toLocaleString('default', {month : 'short'});
        const year = d.getFullYear();
    
        return `${day}, ${month} ${year}`;
    }

    return {formateDate} 

}
