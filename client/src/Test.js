import React, {useState, useEffect} from 'react';

function Test() {
    const [word, setWord] = useState('');

    useEffect(() => {
        fetch('/test')
        .then(response => response.json())
        .then(responseObject => setWord(responseObject.data))
        .catch(error => console.error(error));
    }, []);
  
return (
<div>{word}</div> 
  
) 
}
export default Test;