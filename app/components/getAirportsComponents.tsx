import { useEffect, useState } from "react";

export default function AiportsSearchComponent() {
    
  const uri: string = "http://localhost:3000/api/connections";
  const encodedUri: string = encodeURI(uri);
  const [aeroportosArray, setAeroportosArray] = useState<any[]>([]); // Defina o estado para armazenar os aeroportos

  useEffect(() => {
    const fetchAeroportos = async () => {
      try {
        const response = await fetch(encodedUri);
        const data = await response.json();
        setAeroportosArray(data); // Define os aeroportos no estado
      } catch (error) {
        console.error("Erro ao buscar aeroportos:", error);
      }
    };

    fetchAeroportos(); // Chame a função de busca dos aeroportos ao montar o componente
  }, []); // UseEffect com array vazio como segundo argumento para executar apenas uma vez ao montar o componente
}
