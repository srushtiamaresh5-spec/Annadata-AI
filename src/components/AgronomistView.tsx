import React, { useState, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Upload, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  AlertCircle, 
  CheckCircle2, 
  Image as ImageIcon, 
  RefreshCw, 
  Leaf, 
  ShieldAlert, 
  PhoneCall,
  X
} from 'lucide-react';
import { AppLanguage, AgronomistChatMessage, DiseaseDiagnosisResult } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SAMPLE_DISEASE_IMAGES } from '../data/agriData';

interface AgronomistViewProps {
  language: AppLanguage;
}

export const AgronomistView: React.FC<AgronomistViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  // Chat state
  const [messages, setMessages] = useState<AgronomistChatMessage[]>([
    {
      id: 'init-msg',
      sender: 'ai',
      text: language === 'kn'
        ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅನ್ನದಾತ AI ಕೃಷಿ ತಜ್ಞ. ನಿಮ್ಮ ಬೆಳೆ ರೋಗಗಳು, ಸಾವಯವ ಗೊಬ್ಬರ ತಯಾರಿಕೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದರಗಳ ಬಗ್ಗೆ ಕೇಳಿ!'
        : language === 'hi'
        ? 'नमस्ते! मैं आपका अन्नदाता AI कृषि विशेषज्ञ हूँ। अपनी फसल के रोग, जैविक खाद निर्माण या मंडी भाव के बारे में पूछें।'
        : 'Namaskara! I am your Annadata AI Agronomist. Ask me about crop diseases, organic formulations (Jeevamrutha, Neemastra), soil care, or weather forecasts.',
      timestamp: '10:00 AM',
      language,
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Vision scanner state
  const [selectedSampleImage, setSelectedSampleImage] = useState(SAMPLE_DISEASE_IMAGES[0]);
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiseaseDiagnosisResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMessage: AgronomistChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsAiTyping(true);

    try {
      const response = await fetch('/api/agronomist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          conversationHistory: messages.slice(-4),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage: AgronomistChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleDiagnoseImage = async (base64Img: string, cropHint?: string) => {
    setIsDiagnosing(true);
    setDiagnosisResult(null);

    try {
      const response = await fetch('/api/agronomist/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Img,
          cropHint: cropHint || selectedSampleImage.name,
          language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDiagnosisResult(data);
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setCustomImageBase64(base64);
      handleDiagnoseImage(base64, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'kn') utterance.lang = 'kn-IN';
    else if (language === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const quickPrompts = [
    { label: 'Organic Jeevamrutha Recipe', query: 'How do I prepare traditional organic Jeevamrutha for soil fertility?' },
    { label: 'Signs of Ragi Blast', query: 'What are early symptoms of blast disease in finger millet and how to cure it?' },
    { label: 'Optimal Harvest Moisture', query: 'What is the optimal harvest moisture percentage for millets and pulses?' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              {t.navAgronomist}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-700" />
              Multilingual Gemini 2.5
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Voice-enabled agronomy advisory, pest diagnosis, and certified organic bio-control formulations
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-200">
          <Leaf className="w-4 h-4 text-emerald-700" />
          <span>Languages: <strong>English &bull; ಕನ್ನಡ &bull; हिन्दी</strong></span>
        </div>
      </div>

      {/* Main Grid: AI Chat | Computer Vision Crop Leaf Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Chat Interface */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs flex flex-col h-[650px] overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Annadata AI Agronomist</h3>
                <span className="text-[11px] text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active in {language.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSpeakText(messages[messages.length - 1]?.text || '')}
              className={`p-2 rounded-xl border transition-colors ${
                isSpeaking
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
              title="Voice Readout"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAi ? '' : 'flex-row-reverse'}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isAi ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-800 text-white'
                  }`}>
                    {isAi ? <Bot className="w-4 h-4" /> : 'You'}
                  </div>

                  <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1 ${
                    isAi
                      ? 'bg-stone-100 text-stone-800 rounded-tl-none'
                      : 'bg-emerald-700 text-white rounded-tr-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className={`text-[10px] block text-right ${isAi ? 'text-stone-400' : 'text-emerald-200'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isAiTyping && (
              <div className="flex items-center gap-2 text-xs text-stone-400 p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>AI Agronomist is analyzing micro-climate knowledge base...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-stone-100 bg-stone-50 flex gap-2 overflow-x-auto scrollbar-none">
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSendMessage(p.query)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white text-stone-700 border border-stone-200 hover:border-emerald-600 whitespace-nowrap transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-stone-200 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={t.askQuestionPlaceholder}
              className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 bg-stone-50/60"
            />
            <button
              type="submit"
              disabled={isAiTyping || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-40 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Right Col: AI Crop Disease Scanner (Vision Diagnostic) */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-5 flex flex-col space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 text-base font-serif">
                  {t.diseaseScannerTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  Vision AI Diagnostic
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Detect foliar pathogens, pest infestation, and get immediate organic remediation recipes
              </p>
            </div>
          </div>

          {/* Preset Sample Selector */}
          <div>
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
              Select Sample Crop Leaf or Upload:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_DISEASE_IMAGES.map((sample) => {
                const isSelected = selectedSampleImage.name === sample.name && !customImageBase64;
                return (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => {
                      setCustomImageBase64(null);
                      setSelectedSampleImage(sample);
                      handleDiagnoseImage(sample.imageUrl, sample.name);
                    }}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={sample.imageUrl}
                      alt={sample.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-16 object-cover rounded-lg mb-1.5"
                    />
                    <div className="text-[11px] font-bold text-stone-900 truncate">
                      {sample.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload Custom Leaf Button */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2.5 px-3 rounded-xl border-2 border-dashed border-stone-300 hover:border-emerald-600 bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4 text-emerald-700" />
              Upload Field Photo (.JPG / .PNG)
            </button>
            <button
              type="button"
              onClick={() => handleDiagnoseImage(customImageBase64 || selectedSampleImage.imageUrl, selectedSampleImage.name)}
              disabled={isDiagnosing}
              className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs disabled:opacity-50"
            >
              {isDiagnosing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
              Analyze Leaf
            </button>
          </div>

          {/* Diagnostic Result Box */}
          <div className="flex-1 overflow-y-auto">
            {isDiagnosing ? (
              <div className="h-48 flex flex-col items-center justify-center text-center p-6 bg-stone-50 rounded-2xl border border-stone-200">
                <RefreshCw className="w-8 h-8 text-emerald-700 animate-spin mb-2" />
                <h4 className="font-bold text-stone-900 text-sm">Gemini Vision Scanning Pathogen...</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Correlating spectral fungal lesions with Indian Council of Agricultural Research (ICAR) pathogen repository
                </p>
              </div>
            ) : diagnosisResult ? (
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3 text-xs animate-fadeIn">
                
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-emerald-200/80">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Diagnosis: {diagnosisResult.cropAffected}
                    </span>
                    <h4 className="text-base font-bold text-stone-900 font-serif">
                      {diagnosisResult.pathogen}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-700 text-white">
                      {diagnosisResult.confidencePercent}% Confidence
                    </span>
                    <span className={`block text-[10px] font-bold mt-1 ${
                      diagnosisResult.severity === 'Severe' ? 'text-rose-700' : 'text-amber-800'
                    }`}>
                      Severity: {diagnosisResult.severity}
                    </span>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <strong className="text-stone-900 block font-semibold mb-0.5">Identified Symptoms:</strong>
                  <p className="text-stone-700 leading-relaxed">{diagnosisResult.symptoms}</p>
                </div>

                {/* Organic Treatment */}
                <div className="p-3 rounded-xl bg-white border border-emerald-200/80">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Certified Organic Remediation Recipe:</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{diagnosisResult.organicRemedy}</p>
                </div>

                {/* Chemical Backup */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <strong className="text-stone-900 block font-semibold mb-0.5">Conventional Backup (ICAR Approved):</strong>
                  <p className="text-stone-600">{diagnosisResult.chemicalRemedy}</p>
                </div>

                {/* Prevention Protocol */}
                <div className="text-stone-600 text-[11px]">
                  <strong>Farm Hygiene:</strong> {diagnosisResult.preventiveMeasures}
                </div>

              </div>
            ) : (
              /* Default initial diagnosis preview */
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Ready to Scan Leaf Samples</span>
                </div>
                <p>
                  Click on any crop preset above or upload an actual photo from your field to analyze fungal leaf spots, viral mosaic curls, or nutrient deficiencies in real-time.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
