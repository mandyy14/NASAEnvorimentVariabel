import React, { useEffect, useState } from "react";
import axios from "axios";

// Interface para definir a estrutura dos dados que serão recebidos da API da NASA
interface NasaPhotoData {
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
  url: string;
}

const NasaPhoto: React.FC = () => {
  const [photoData, setPhotoData] = useState<NasaPhotoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Chave por meio do .env.nasa
  const NASA_API_KEY = import.meta.env.VITE_APP_NASA_API_KEY;

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        // GET para a API da NASA usando a chave de API da variável de ambiente
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        setPhotoData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Erro ao carregar a imagem da NASA:", err);
        setError("Erro ao carregar a imagem da NASA.");
      }
    };

    fetchPhoto();
  }, [NASA_API_KEY]);

  if (error) return <div>{error}</div>;
  if (!photoData) return <div>Carregando...</div>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{photoData.title}</h1>
      <p>{photoData.date}</p>
      <img
        src={photoData.url}
        alt={photoData.title}
        style={{ maxWidth: "100%" }}
      />
      <p>{photoData.explanation}</p>
    </div>
  );
};

export default NasaPhoto;
