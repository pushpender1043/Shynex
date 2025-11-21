import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import ai from "../assets/ai.png";
import { ShopDataContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import open from "../assets/open.mp3";

function Ai() {
  const { showSearch, setShowSearch } = useContext(ShopDataContext);
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);

  // Persistent reference for Audio
  const openingSoundRef = useRef(null);
  useEffect(() => {
    // Initializes Audio once
    openingSoundRef.current = new Audio(open);
  }, []);

  // Memoized Speak function (Stable)
  const speak = useCallback((message) => {
    try {
      const utter = new SpeechSynthesisUtterance(message);
      // Cancel any ongoing speech to avoid queueing
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch (error) {
      console.log("Speech synthesis failed:", error);
    }
  }, []);

  // Persistent SpeechRecognition instance reference
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        "Voice commands need Chrome, Edge or Opera. Try enabling mic permissions."
      );
      return;
    }

    // Initialize recognition object
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    // Setting language can improve accuracy
    recognition.lang = "en-IN"; 
    
    // Store the object in the ref for persistence
    recognitionRef.current = recognition;

    // --- EVENT HANDLERS (Defined inside useEffect to capture latest dependencies) ---
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase().trim();

      console.log("Voice command received:", transcript);

      // --- ALL COMMANDS ---
      if (transcript.includes("open search") || transcript.includes("search open")) {
        speak("Opening Search");
        setShowSearch(true);
        navigate("/collection");
      } 
      else if (transcript.includes("close search")) {
        speak("Closing Search");
        setShowSearch(false);
      } 
      else if (transcript.includes("collection") || transcript.includes("products")) {
        speak("Opening collection page");
        navigate("/collection");
      }
      else if (transcript.includes("about")) {
        speak("Opening About page");
        navigate("/about");
        setShowSearch(false);
      }
      else if (transcript.includes("home")) {
        speak("Going to home page");
        navigate("/");
        setShowSearch(false); // Added for safety
      }
      else if (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat")) {
        speak("Opening your cart");
        navigate("/cart");
        setShowSearch(false); // Added for safety
      }
      else if (transcript.includes("contact")) {
        speak("Opening contact page");
        navigate("/contact");
        setShowSearch(false);
      }
      else if (transcript.includes("order") || transcript.includes("my orders")) {
        speak("Opening your orders page");
        navigate("/order");
        setShowSearch(false);
      }
      else {
        toast.error(`Command not recognized: "${transcript}"`);
        speak("I did not understand. Please try again.");
      }
    };

    recognition.onerror = (event) => {
      console.log("Recognition Error:", event.error);

      if (event.error === "not-allowed") {
        toast.error("Microphone permission denied.");
        speak("I need microphone permission to work.");
      } else if (event.error === "no-speech") {
        speak("I did not hear anything.");
      } else if (event.error === "audio-capture") {
        speak("I cannot detect any microphone.");
      }
      setActiveAi(false);
    };

    recognition.onend = () => {
      setActiveAi(false);
    };
    
    // Cleanup function: Stops recognition and removes handlers when component unmounts
    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.onresult = null;
            recognitionRef.current.onerror = null;
            recognitionRef.current.onend = null;
            recognitionRef.current.stop();
        }
    };
    
    // CRITICAL FIX: Dependencies ensure handlers always use the latest state/props
  }, [navigate, speak, setShowSearch, showSearch]); 

  // Start listening function
  const startRecognition = async () => {
    try {
      // Play sound using ref and handle potential browser autoplay block
      openingSoundRef.current.play().catch(()=>{});
    } catch (err) {
      console.log("Autoplay blocked, attempting silent start.");
    }

    if (recognitionRef.current) {
      setActiveAi(true);
      // Start the recognition instance stored in the ref
      recognitionRef.current.start();
    } else {
      toast.error("Speech Recognition not supported.");
    }
  };

  return (
    <div
      // Positioning to stack ABOVE the Chatbot (bottom: ~400px + 50px offset)
      className="fixed bottom-[80px] right-[17px] z-50"
      onClick={startRecognition}
    >
      <img
        src={ai}
        alt="AI"
        className={`w-[100px] cursor-pointer
          ${
            activeAi
              ? "translate-x-[10%] translate-y-[-10%] scale-125"
              : "scale-100"
          }
          transition-transform duration-300
        `}
        style={{
          filter: activeAi
            ? "drop-shadow(0px 0px 30px #00d2fc)"
            : "drop-shadow(0px 0px 20px black)",
        }}
      />
    </div>
  );
}

export default Ai;