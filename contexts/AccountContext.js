"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const AccountContext = createContext();

// Proveedor del contexto
export const IgProvider = ({ children }) => {
  const [data, setData] = useState({ instagram: [], commerce: [] });
  const [whatsappMessages, setWhatsappMessages] = useState([]);
  const [error, setError] = useState(null);

  // Cache keys para localStorage
  const CACHE_KEY = "meta_data";
  const TIMESTAMP_KEY = "meta_last_fetched";
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos

  // Función para obtener datos de Instagram
  async function fetchInstagram() {
    try {
      const accessToken = process.env.NEXT_PUBLIC_IG_TOKEN; // Reemplaza con tu access token de Instagram
      const fieldsUser = "id,username,account_type,media_count,media{caption,id,media_type,media_url,permalink,timestamp,username,thumbnail_url,children{media_type,media_url,thumbnail_url},comments_count,like_count,is_comment_enabled,is_shared_to_feed,owner,shortcode,alt_text}";
      const response = await fetch(
        `https://graph.instagram.com/me?fields=${fieldsUser}&access_token=${accessToken}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Error al buscar datos de Instagram");
      }

      const products = {
        user_id: data.id,
        username: data.username,
        account_type: data.account_type,
        media_count: data.media_count,
        media: data.media.data.map((item) => {
          return {
            id: item.id,
            media_type: item.media_type,
            description: item.caption || null,
            media_url: item.media_url,
            permalink: item.permalink,
            timestamp: item.timestamp,
            username: item.username,
            thumbnail_url: item.thumbnail_url || null,
            posts: item.children ? item.children.data : [],
            comments_count: item.comments_count || 0,
            likes: item.like_count || 0,
            comment_enabled: item.is_comment_enabled || false,
            shared_to_feed: item.is_shared_to_feed || false,
            owner: item.owner || null,
            shortcode: item.shortcode || null
          }})
      }
      return products;
    } catch (err) {
      throw new Error("Error al obtener datos de Instagram: " + err.message);
    }
  }

  // Función para obtener productos de comercio electrónico
  async function fetchCommerceProducts() {
    try {
      const accessToken = "TU_ACCESS_TOKEN_COMMERCE"; // Reemplaza con tu access token para comercio
      const catalogId = "TU_CATALOG_ID"; // Reemplaza con el ID de tu catálogo
      const fields = "id,name,price,currency,description,image_url,product_type,availability";
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${catalogId}/products?fields=${fields}&access_token=${accessToken}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Error al buscar productos de comercio");
      }

      console.log("Productos de comercio:", data.data);
      return data.data || [];
    } catch (err) {
      return []; // Retornar un array vacío en caso de error
      //throw new Error("Error al obtener productos de comercio: " + err.message);
    }
  }

  // Función para enviar mensaje de WhatsApp
  async function sendWhatsAppMessage(to, message) {
    try {
      const phoneNumberId = "TU_PHONE_NUMBER_ID"; // Reemplaza con tu ID de número de teléfono
      const accessToken = "TU_ACCESS_TOKEN_WHATSAPP"; // Reemplaza con tu access token de WhatsApp
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: to,
            type: "text",
            text: { body: message },
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Error al enviar mensaje de WhatsApp");
      }

      console.log("Mensaje de WhatsApp enviado:", data);
      return data;
    } catch (err) {
      throw new Error("Error al enviar mensaje de WhatsApp: " + err.message);
    }
  }

  // Función para recibir mensajes de WhatsApp (Webhook simulado)
  async function fetchWhatsAppMessages() {
    // Nota: Los mensajes de WhatsApp generalmente se reciben a través de un webhook.
    // Aquí se simula una consulta a un endpoint para obtener mensajes.
    try {
      const phoneNumberId = "601912243012054"; // Reemplaza con tu ID de número de teléfono
      const accessToken = "EAAJu862ZBjdABOZBZB7TiZCo1pI2DuEpC5ZAhKgMvsJePIu0EJ9etxZBS4ND6YZCVLGGzXjAUKN0rCYVeA3ml1bmjPpBSZCwoDiNZAVEexmCw5w3s9N5KlB7eb6x8xHZBTrEmrlOR4RD555ZB5eYezj2sygrjQmdPTG8ZAqYLjqUJQt38AZCZA3htZBnO02qkaBIKFJhZAPoo7QpGcYLZAt437TAkao8iq3sA9E0ZD"; // Reemplaza con tu access token de WhatsApp
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${phoneNumberId}/messages?access_token=${accessToken}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Error al obtener mensajes de WhatsApp");
      }

      console.log("Mensajes de WhatsApp recibidos:", data.data);
      return data.data || [];
    } catch (err) {
      return []; // Retornar un array vacío en caso de error
      //throw new Error("Error al obtener mensajes de WhatsApp: " + err.message);
    }
  }

  // Función para obtener y combinar todos los datos
  async function fetchAllData() {
    try {
      const [instagramData, commerceData, whatsappData] = await Promise.all([
        fetchInstagram(),
        fetchCommerceProducts(),
        fetchWhatsAppMessages(),
      ]);

      // Actualizar el estado
      setData({ instagram: instagramData, commerce: commerceData });
      setWhatsappMessages(whatsappData);
      setError(null);

      // Guardar en localStorage
      if (typeof window !== "undefined") {
        const cacheData = {
          instagram: instagramData,
          commerce: commerceData,
          whatsapp: whatsappData,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        console.log("Datos combinados almacenados en caché:", cacheData);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error al obtener datos:", err.message);
    }
  }

  // Cargar datos en caché y programar actualizaciones
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Comprobar datos en caché
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const timeSinceLastFetch = Date.now() - parsedData.timestamp;
        if (timeSinceLastFetch < CACHE_DURATION) {
          setData({
            instagram: parsedData.instagram,
            commerce: parsedData.commerce,
          });
          setWhatsappMessages(parsedData.whatsapp);
          console.log("Datos en caché cargados:", parsedData);
          return;
        }
      }
    } catch (err) {
      console.error("Error al leer datos del caché:", err.message);
    }

    // Obtener datos nuevos si no hay caché válido
    fetchAllData();

    // Configurar intervalo para actualizaciones periódicas
    const intervalId = setInterval(() => {
      fetchAllData();
    }, CACHE_DURATION);

    // Limpiar intervalo al desmontar
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AccountContext.Provider
      value={{
        data,
        whatsappMessages,
        fetchInstagram,
        error,
        sendWhatsAppMessage,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// Hook personalizado
export const useIg = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useIg debe usarse dentro de un IgProvider");
  }
  return context;
};