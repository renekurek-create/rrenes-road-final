import React, { useState, useEffect } from 'react';
import WeightChart from './WeightChart';
import WeightModal from './WeightModal';
import HistoryList from './HistoryList';
import BMIBox from './BMIBox';
import ProgressBar from './ProgressBar';

// --- STYLING KONSTANTEN ---
const gradientTextClass = "bg-gradient-to-r from-[#00cca0] to-[#0ea5e9] bg-clip-text text-transparent";
const gradientButtonClass = "bg-gradient-to-r from-[#00cca0] to-[#0ea5e9] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all";

// --- KOMPONENTEN FÜR DAS MENÜ ---

const DesktopMenuLink = ({ children, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-bold uppercase tracking-wider transition-all px-3 py-2 rounded-lg ${
      active 
        ? gradientTextClass + ' font-black bg-gradient-to-r from-[#00cca0]/10 to-[#0ea5e9]/10' 
        : 'text-slate-600 hover:text-[#00cca0] hover:bg-gradient-to-r hover:from-[#00cca0]/5 hover:to-[#0ea5e9]/5'
    }`}
  >
    {children}
  </button>
);

const MobileMenuLink = ({ children, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left text-lg font-bold p-4 border-b border-slate-100 ${
      active ? 'text-[#00cca0] bg-[#00cca0]/5' : 'text-slate-600'
    }`}
  >
    {children}
  </button>
);

// --- REZEPTE KOMPONENTE ---
const Recipes = ({ recipes }) => {
  return (
    <div className="max-w-6xl mx-auto mt-8 animate-fade-in pb-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 italic uppercase tracking-tight">Meine Küche</h2>
        <p className="text-slate-500 mt-2">Lecker, schnell & gesund.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="group relative h-[450px] rounded-3xl overflow-hidden shadow-md cursor-pointer border-2 border-[#00cca0]/50 hover:border-[#00cca0] transition-all">
            <img 
              src={recipe.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop'} 
              alt={recipe.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end transition-transform duration-500 translate-y-[60%] group-hover:translate-y-0">
              <div className="mb-4">
                <div className="flex gap-2 mb-2 flex-wrap">
                  {recipe.tags.map(tag => (
                    <span key={tag} className="bg-[#00cca0] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-white leading-tight shadow-black drop-shadow-md">{recipe.title}</h3>
              </div>
              <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm text-slate-200 overflow-y-auto max-h-[60%]">
                <div><h4 className="font-bold text-[#00cca0] uppercase text-xs mb-1">Zutaten</h4><p>{recipe.ingredients.join(", ")}</p></div>
                <div><h4 className="font-bold text-[#0ea5e9] uppercase text-xs mb-1">Zubereitung</h4><ol className="list-decimal list-inside space-y-1">{recipe.steps.map((step, i) => <li key={i}>{step}</li>)}</ol></div>
              </div>
              <div className="absolute top-4 right-4 text-white/50 group-hover:hidden animate-bounce">⬆</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GALERIE KOMPONENTE ---
const Gallery = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-4xl mb-4">📸</p>
        <p>Noch keine Bilder in der Galerie.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 animate-fade-in pb-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 italic uppercase tracking-tight">Meine Erfolge</h2>
        <p className="text-slate-500 mt-2">Ein Bild sagt mehr als 1000 Worte.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white p-3 rounded-2xl shadow-sm border-2 border-[#0ea5e9]/50 hover:border-[#0ea5e9] group hover:shadow-lg transition-all">
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative">
               <img 
                 src={img.image} 
                 alt={img.caption} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute bottom-0 left-0 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-tr-lg">
                 {img.date}
               </div>
            </div>
            <div className="mt-3 px-1">
              <p className="font-bold text-slate-700 text-sm">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ROADBOOK (BLOG) KOMPONENTE ---
const Roadbook = ({ entries }) => {
  return (
    <div className="animate-fade-in pb-10">
      <div className="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden mb-12 shadow-md">
         <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/bj7LtWLY/start.png')", filter: "brightness(0.6)" }}></div>
         <div className="relative z-10 text-center px-4">
           <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tight drop-shadow-lg">Roadbook</h2>
           <div className="w-20 h-1 bg-[#00cca0] mx-auto mt-4 rounded-full mb-4 shadow-lg"></div>
           <p className="text-slate-200 text-lg md:text-xl font-medium tracking-wide">Gedanken. Gefühle. Fortschritt.</p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {entries.map((entry) => (
          <div key={entry.id} className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="md:w-32 shrink-0 flex flex-row md:flex-col items-center md:items-end justify-center md:justify-start gap-2 md:gap-1 text-slate-500 bg-white md:bg-transparent p-4 md:p-0 rounded-2xl shadow-sm md:shadow-none border-2 border-[#00cca0]/50 md:border-[#00cca0]/50">
               <span className={`text-3xl md:text-4xl font-black ${gradientTextClass}`}>{entry.date.split('.')[0]}</span>
               <span className="text-lg md:text-xl font-bold uppercase tracking-wider text-[#00cca0]">{new Date(entry.date.split('.').reverse().join('-')).toLocaleString('de-DE', { month: 'short' })}</span>
               <span className="text-xs md:text-sm font-light text-[#00cca0]">{entry.date.split('.')[2]}</span>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border-2 border-[#00cca0]/50 relative w-full">
               <div className="hidden md:block absolute top-8 -left-12 w-12 h-[2px] bg-slate-300"></div>
               <div className="hidden md:block absolute top-7 -left-[53px] w-4 h-4 rounded-full bg-[#00cca0] ring-4 ring-slate-100"></div>

               <h3 className="text-2xl font-bold text-[#00cca0] mb-4">{entry.title}</h3>
               
               {entry.image && (
                 <img src={entry.image} alt={entry.title} className="w-full h-64 object-cover rounded-xl mb-6 shadow-sm" />
               )}

               <div className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                 {entry.text}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SEITEN INHALTE ---
const Impressum = () => (
  <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border-2 border-slate-200 mt-8 animate-fade-in text-slate-700">
    <h2 className="text-3xl font-bold mb-6 text-slate-800">Impressum</h2>
    <h3 className="text-xl font-bold mb-2">Angaben gemäß § 5 TMG</h3>
    <p className="mb-4">René [Dein Nachname]<br />[Deine Straße]<br />[Dein Ort]</p>
    <h3 className="text-xl font-bold mb-2">Kontakt</h3>
    <p className="mb-4">E-Mail: [Deine E-Mail]</p>
  </div>
);

const Datenschutz = () => (
  <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border-2 border-slate-200 mt-8 animate-fade-in text-slate-700">
    <h2 className="text-3xl font-bold mb-6 text-slate-800">Datenschutzerklärung</h2>
    <p>Daten werden nur lokal im Browser gespeichert.</p>
  </div>
);

// --- ÜBER MICH ---
const AboutMe = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 animate-fade-in pb-10">
      <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-[#00cca0]/50 flex flex-col md:flex-row items-center gap-8 text-center md:text-left mb-8">
        <div className="relative shrink-0">
           <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-[#00cca0] to-[#0ea5e9] shadow-lg">
             <img src="https://i.ibb.co/G3HyJNCj/rene-jpg.jpg" alt="René" className="w-full h-full object-cover rounded-full border-4 border-white bg-slate-100" onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerText='👤'; e.target.parentElement.className="w-40 h-40 rounded-full flex items-center justify-center text-6xl border-4 border-white shadow-lg text-slate-300 bg-slate-50"}} />
           </div>
        </div>
        <div>
          <h2 className="text-4xl font-black text-slate-800 italic tracking-tight mb-2">Hi, ich bin René.</h2>
          <p className={`font-bold uppercase tracking-wider mb-4 ${gradientTextClass}`}>47 Jahre • Familienvater • Kämpfer</p>
          <p className="text-slate-600 text-lg leading-relaxed">
            Ehemann seit 14 Jahren, Vater von zwei Töchtern und jemand, der entschieden hat: 
            <span className="font-bold text-slate-800"> Es reicht.</span>
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-red-400/50">
          <div className="text-3xl mb-4 text-red-500">🚨</div>
          <h3 className="text-xl font-bold text-red-600 mb-3">Der Weckruf</h3>
          <p className="text-slate-600 leading-relaxed">
            Mein Körper hat mir die Rote Karte gezeigt: Bandscheibenvorfall, Migräne, Rückenschmerzen und schlechter Schlaf. 
            Ich will nicht mit 50 einen Herzinfarkt riskieren. Ich will fit sein – für meine Frau und meine Mädels (14 & 10). 
            Gesundheit ist Lebensqualität, und die hole ich mir zurück.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-[#00cca0]/50">
          <div className="text-3xl mb-4 text-[#00cca0]">⚡️</div>
          <h3 className="text-xl font-bold text-[#00cca0] mb-3">Der Schlachtplan</h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2"><span className="text-[#00cca0] font-bold">✓</span> <span>4x Woche <strong>Freeletics</strong> (keine Ausreden!)</span></li>
            <li className="flex gap-2"><span className="text-[#00cca0] font-bold">✓</span> <span>7.500 Schritte/Tag (gemessen mit <strong>Garmin Venu 4</strong>)</span></li>
            <li className="flex gap-2"><span className="text-[#00cca0] font-bold">✓</span> <span>16/8 Intervallfasten & Kalorien (Yazio)</span></li>
             <li className="flex gap-2"><span className="text-[#00cca0] font-bold">✓</span> <span>Support durch More Nutrition</span></li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl shadow-md text-white md:col-span-2 relative overflow-hidden border-2 border-slate-700">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">🍫</span> Mein Endgegner
            </h3>
            <p className="text-slate-300 leading-relaxed max-w-2xl">
              Ich liebe Schokolade. Sie ist mein Laster und mein größter Feind. Aber ich habe Disziplin: 
              Jedes Jahr von Aschermittwoch bis Ostern verzichte ich komplett. Früher war ich Leistungssportler, 
              dann kam der Büro-Job und das Auto. Jetzt kämpfe ich mich zurück zu meiner alten Form.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        </div>
      </div>
    </div>
  );
};

const AdminLogin = ({ onLogin, onAddRecipe, onAddGalleryImage, onAddRoadbookEntry }) => {
  const [pin, setPin] = useState(''); const [error, setError] = useState(false); const [activeAdminTab, setActiveAdminTab] = useState('weights');
  const [newRecipe, setNewRecipe] = useState({ title: '', tags: '', ingredients: '', steps: '', image: '' });
  const [newGallery, setNewGallery] = useState({ caption: '', date: new Date().toISOString().split('T')[0], image: '' });
  const [newEntry, setNewEntry] = useState({ title: '', date: new Date().toISOString().split('T')[0], text: '', image: '' });

  const handleLogin = (e) => { e.preventDefault(); if (pin === '1979') { onLogin(); } else { setError(true); setPin(''); }};
  const handleImageUpload = (e, setTargetState, currentTargetState) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2500000) { alert("Bild zu groß! Bitte kleiner als 2.5MB."); return; }
      const reader = new FileReader();
      reader.onloadend = () => { setTargetState({...currentTargetState, image: reader.result}); };
      reader.readAsDataURL(file);
    }
  };

  const submitRecipe = (e) => { e.preventDefault(); onAddRecipe(newRecipe); setNewRecipe({ title: '', tags: '', ingredients: '', steps: '', image: '' }); alert("Rezept gespeichert!"); };
  const submitGallery = (e) => { e.preventDefault(); if(!newGallery.image) { alert("Bitte ein Bild auswählen!"); return; } onAddGalleryImage(newGallery); setNewGallery({ caption: '', date: new Date().toISOString().split('T')[0], image: '' }); alert("Bild zur Galerie hinzugefügt!"); };
  const submitRoadbook = (e) => { e.preventDefault(); onAddRoadbookEntry(newEntry); setNewEntry({ title: '', date: new Date().toISOString().split('T')[0], text: '', image: '' }); alert("Roadbook Eintrag gespeichert!"); };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => setActiveAdminTab('weights')} className={`font-bold pb-2 whitespace-nowrap ${activeAdminTab==='weights' ? 'text-[#00cca0] border-b-2 border-[#00cca0]' : 'text-slate-400'}`}>Gewicht</button>
        <button onClick={() => setActiveAdminTab('recipes')} className={`font-bold pb-2 whitespace-nowrap ${activeAdminTab==='recipes' ? 'text-[#00cca0] border-b-2 border-[#00cca0]' : 'text-slate-400'}`}>Rezepte</button>
        <button onClick={() => setActiveAdminTab('gallery')} className={`font-bold pb-2 whitespace-nowrap ${activeAdminTab==='gallery' ? 'text-[#00cca0] border-b-2 border-[#00cca0]' : 'text-slate-400'}`}>Galerie</button>
        <button onClick={() => setActiveAdminTab('roadbook')} className={`font-bold pb-2 whitespace-nowrap ${activeAdminTab==='roadbook' ? 'text-[#00cca0] border-b-2 border-[#00cca0]' : 'text-slate-400'}`}>Roadbook</button>
      </div>
      {activeAdminTab === 'weights' && ( <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 text-center animate-fade-in"><p className="text-slate-500 mb-4 font-medium">Neues Gewicht?</p><p className="text-xs text-slate-400">(Nutze den Button "Gewicht eintragen" unten)</p></div>)}
      {activeAdminTab === 'recipes' && ( <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-slate-100 animate-fade-in"><h3 className="font-bold text-slate-800 mb-4">Neues Rezept</h3><form onSubmit={submitRecipe} className="space-y-4"><input required className="w-full border p-3 rounded-xl bg-slate-50" value={newRecipe.title} onChange={e => setNewRecipe({...newRecipe, title: e.target.value})} placeholder="Titel" /><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bild</label><input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewRecipe, newRecipe)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm font-bold file:bg-[#00cca0] file:text-white" />{newRecipe.image && <img src={newRecipe.image} alt="Vorschau" className="mt-2 h-20 rounded-lg" />}</div><input className="w-full border p-3 rounded-xl bg-slate-50" value={newRecipe.tags} onChange={e => setNewRecipe({...newRecipe, tags: e.target.value})} placeholder="Tags (Low Carb...)" /><textarea required className="w-full border p-3 rounded-xl bg-slate-50 h-24" value={newRecipe.ingredients} onChange={e => setNewRecipe({...newRecipe, ingredients: e.target.value})} placeholder="Zutaten" /><textarea required className="w-full border p-3 rounded-xl bg-slate-50 h-24" value={newRecipe.steps} onChange={e => setNewRecipe({...newRecipe, steps: e.target.value})} placeholder="Zubereitung" /><button type="submit" className={`w-full py-3 rounded-xl font-bold ${gradientButtonClass}`}>Rezept speichern</button></form></div>)}
      {activeAdminTab === 'gallery' && ( <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-slate-100 animate-fade-in"><h3 className="font-bold text-slate-800 mb-4">Bild zur Galerie</h3><form onSubmit={submitGallery} className="space-y-4"><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bild hochladen</label><input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewGallery, newGallery)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm font-bold file:bg-[#00cca0] file:text-white" />{newGallery.image && <img src={newGallery.image} alt="Vorschau" className="mt-2 h-32 object-cover rounded-lg border" />}</div><input type="date" required className="w-full border p-3 rounded-xl bg-slate-50" value={newGallery.date} onChange={e => setNewGallery({...newGallery, date: e.target.value})} /><input required className="w-full border p-3 rounded-xl bg-slate-50" value={newGallery.caption} onChange={e => setNewGallery({...newGallery, caption: e.target.value})} placeholder="Beschreibung" /><button type="submit" className={`w-full py-3 rounded-xl font-bold ${gradientButtonClass}`}>Bild speichern</button></form></div>)}
      {activeAdminTab === 'roadbook' && ( <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-slate-100 animate-fade-in"><h3 className="font-bold text-slate-800 mb-4">Neuer Roadbook Eintrag</h3><form onSubmit={submitRoadbook} className="space-y-4"><input required className="w-full border p-3 rounded-xl bg-slate-50 font-bold" value={newEntry.title} onChange={e => setNewEntry({...newEntry, title: e.target.value})} placeholder="Titel" /><input type="date" required className="w-full border p-3 rounded-xl bg-slate-50" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} /><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bild (Optional)</label><input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewEntry, newEntry)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm font-bold file:bg-[#00cca0] file:text-white" />{newEntry.image && <img src={newEntry.image} alt="Vorschau" className="mt-2 h-32 object-cover rounded-lg border" />}</div><textarea required className="w-full border p-3 rounded-xl bg-slate-50 h-40" value={newEntry.text} onChange={e => setNewEntry({...newEntry, text: e.target.value})} placeholder="Deine Gedanken..." /><button type="submit" className={`w-full py-3 rounded-xl font-bold ${gradientButtonClass}`}>Eintrag speichern</button></form></div>)}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // States
  const [weights, setWeights] = useState(() => { try { const s = localStorage.getItem('rene_weights_v4'); if(s) return JSON.parse(s); } catch(e){} return [{ date: 'Start', weight: 107.0 }]; });
  const [recipes, setRecipes] = useState(() => { try { const s = localStorage.getItem('rene_recipes_v4'); if(s) return JSON.parse(s); } catch(e){} return [{ id: 1, title: "Puten-Pfanne mit Feta", tags: ["High Protein", "Low Carb", "Schnell"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop", ingredients: ["200g Pute", "1 Paprika", "1 Zucchini", "50g Feta", "Olivenöl"], steps: ["Fleisch würfeln und anbraten.", "Gemüse dazugeben (10 Min).", "Feta drüberbröseln."] }]; });
  const [galleryImages, setGalleryImages] = useState(() => { try { const s = localStorage.getItem('rene_gallery_v4'); if(s) return JSON.parse(s); } catch(e){} return []; });
  
  // ROADBOOK
  const [roadbookEntries, setRoadbookEntries] = useState(() => { try { const s = localStorage.getItem('rene_roadbook_v4'); if(s) return JSON.parse(s); } catch(e){} return [{ id: 1, date: '18.01.2026', title: 'Der Start meiner Road to 85: Von allem zu viel (vor allem vom Gewicht)', text: `Ich schiebe den Start schon eine ganze Zeit vor mir her, nach dem Motto "Heute ist nicht der richtige Tag um zu starten". Aber wann ist der richtige Tag/Zeitpunkt? Er ist genau JETZT!\n\nIch habe Respekt vor meinem Weg, weil es nicht der erste Versuch ist, mein Wunschgewicht von 85 kg auf gesundem Weg zu erreichen. Aber ich bin fest entschlossen, dass es das letzte Mal ist, dass ich es versuchen muss, weil ich endlich das Ziel erreichen werde: Gesund und nachhaltig abzunehmen.\n\nKörperlich bin ich so ziemlich in der schlechtesten Verfassung, seit ich mich erinnern kann. Der Weg von der Wohnung in den Keller lässt mich in Schweiß ausbrechen. An Joggen ist gar nicht zu denken, weil ich nach 50 Metern ein Sauerstoffzelt benötige. Auch mental bin ich nicht auf der Höhe (Schaffe ich die 12 Wochen Balance-Burn Journey bei Freeletics, macht mein Körper überhaupt mit, kann ich der Versuchung von Schokolade widerstehen).\n\nDer Respekt ist riesig, aber nicht so riesig wie mein Wille und meine Motivation! Ich freue mich, dass es los geht und ihr mich auf meinem Weg begleiten möchtet.\n\nBis die Tage, euer René`, image: '' }]; });

  // SPEICHERN
  useEffect(() => { localStorage.setItem('rene_weights_v4', JSON.stringify(weights)); }, [weights]);
  useEffect(() => { try { localStorage.setItem('rene_recipes_v4', JSON.stringify(recipes)); } catch (e) {} }, [recipes]);
  useEffect(() => { try { localStorage.setItem('rene_gallery_v4', JSON.stringify(galleryImages)); } catch (e) {} }, [galleryImages]);
  useEffect(() => { try { localStorage.setItem('rene_roadbook_v4', JSON.stringify(roadbookEntries)); } catch (e) { alert("Speicher voll!"); } }, [roadbookEntries]);

  const currentWeight = weights.length > 0 ? weights[weights.length - 1].weight : 107.0;
  const handleAddWeight = (val) => { setWeights([...weights, { date: new Date().toLocaleDateString('de-DE', {day:'2-digit',month:'2-digit'}), weight: parseFloat(val) }]); setIsModalOpen(false); };
  const handleAddRecipe = (newRecipeData) => { setRecipes([...recipes, { id: Date.now(), ...newRecipeData, tags: newRecipeData.tags.split(',').map(t=>t.trim()), ingredients: newRecipeData.ingredients.split('\n'), steps: newRecipeData.steps.split('\n') }]); };
  const handleAddGalleryImage = (newImgData) => { setGalleryImages([{ id: Date.now(), date: new Date(newImgData.date).toLocaleDateString('de-DE', {day:'2-digit', month:'2-digit', year:'numeric'}), caption: newImgData.caption, image: newImgData.image }, ...galleryImages]); };
  const handleAddRoadbookEntry = (newEntryData) => { setRoadbookEntries([{ id: Date.now(), date: new Date(newEntryData.date).toLocaleDateString('de-DE', {day:'2-digit', month:'2-digit', year:'numeric'}), title: newEntryData.title, text: newEntryData.text, image: newEntryData.image }, ...roadbookEntries]); };
  const handleDelete = (idx) => { if (weights.length <= 1) return; if (confirm("Löschen?")) setWeights(weights.filter((_, i) => i !== idx)); };
  const navigateTo = (tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); };
  
  const AdminLoginView = () => {
    const [pin, setPin] = useState(''); const [error, setError] = useState(false);
    const handleSubmit = (e) => { e.preventDefault(); if (pin === '1979') { setIsAdminAuthenticated(true); } else { setError(true); setPin(''); } };
    return ( <div className="flex flex-col items-center justify-center h-[50vh]"><div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#00cca0] max-w-sm w-full text-center"><div className="text-5xl mb-4">🔒</div><h3 className="text-xl font-bold text-slate-800 mb-2">Admin Bereich</h3><p className="text-slate-500 mb-6">Bitte PIN eingeben</p><form onSubmit={handleSubmit} className="space-y-4"><input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full text-center text-2xl tracking-widest p-3 border rounded-xl" placeholder="••••" maxLength={4} />{error && <p className="text-red-500 text-sm font-bold">Falsche PIN!</p>}<button type="submit" className="w-full bg-[#00cca0] text-white font-bold py-3 rounded-xl">Entsperren</button></form></div></div> );
  }

  return (
    <div className="min-h-screen font-sans bg-slate-100 flex flex-col">
      <WeightModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddWeight} />
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => navigateTo('home')}>
            {/* LOGO: DEIN EIGENER LINK (image-4db4cd) mit MIX-BLEND-MULTIPLY Trick */}
            <img 
              src="https://i.ibb.co/LzmSDTMp/image-4db4cd.png" 
              alt="Logo" 
              className="w-14 h-14 transition-transform group-hover:scale-110 mix-blend-multiply" 
            />
            <div className="ml-3 font-extrabold italic tracking-tighter text-lg leading-none uppercase bg-gradient-to-r from-[#00cca0] to-[#0ea5e9] bg-clip-text text-transparent hidden xs:block">
              René's Road<br/>to 85
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex gap-2"><DesktopMenuLink active={activeTab === 'recipes'} onClick={() => navigateTo('recipes')}>Rezepte</DesktopMenuLink><DesktopMenuLink active={activeTab === 'gallery'} onClick={() => navigateTo('gallery')}>Galerie</DesktopMenuLink><DesktopMenuLink active={activeTab === 'roadbook'} onClick={() => navigateTo('roadbook')}>Roadbook</DesktopMenuLink><DesktopMenuLink active={activeTab === 'about'} onClick={() => navigateTo('about')}>Über Mich</DesktopMenuLink></div>
            <button onClick={() => navigateTo('admin')} className={`p-2 md:px-4 md:py-2 rounded-full font-bold uppercase text-xs flex items-center gap-2 border-2 border-[#00cca0] text-[#00cca0] hover:bg-[#00cca0] hover:text-white transition-all shadow-sm`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> <span className="hidden md:inline">Admin</span></button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-600 hover:text-[#00cca0] transition-colors">{isMobileMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>}</button>
          </div>
        </div>
        {isMobileMenuOpen && ( <div className="md:hidden border-t border-slate-100 bg-white absolute w-full left-0 shadow-xl z-50 animate-fade-in-up"><div className="flex flex-col p-2"><MobileMenuLink active={activeTab === 'home'} onClick={() => navigateTo('home')}>🏠 Startseite</MobileMenuLink><MobileMenuLink active={activeTab === 'recipes'} onClick={() => navigateTo('recipes')}>🥦 Rezepte</MobileMenuLink><MobileMenuLink active={activeTab === 'gallery'} onClick={() => navigateTo('gallery')}>📸 Galerie</MobileMenuLink><MobileMenuLink active={activeTab === 'roadbook'} onClick={() => navigateTo('roadbook')}>📖 Roadbook</MobileMenuLink><MobileMenuLink active={activeTab === 'about'} onClick={() => navigateTo('about')}>👤 Über Mich</MobileMenuLink></div></div>)}
      </nav>

      <div className="flex-grow">
        {activeTab === 'home' && (
          <>
            <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden mb-12">
              {/* Hintergrundbild - Direktlink von ImgBB für das Startbild */}
              <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/bj7LtWLY/start.png')", filter: "brightness(0.9) saturate(1.1)" }}></div>
              
              {/* Die Box unten rechts */}
              <div className="absolute bottom-6 right-4 md:right-10 z-20 max-w-xs md:max-w-md p-4 md:p-6 bg-black/40 backdrop-blur-md rounded-2xl shadow-xl text-right border border-white/20">
                <h1 className="text-lg md:text-2xl font-black italic leading-tight tracking-wider text-white/90">
                  STARTEN. GEHEN.<br/>HINFALLEN. AUFSTEHEN.<br/>ANKOMMEN.
                </h1>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-10 animate-fade-in-up">
              <ProgressBar currentWeight={currentWeight} startWeight={107} goalWeight={85} />
              <div className="mt-12 bg-white p-6 rounded-3xl shadow-sm border-2 border-[#0ea5e9]/50">
                 <h3 className="font-bold text-[#0ea5e9] mb-4 uppercase text-sm tracking-wider">Verlauf</h3>
                 <WeightChart data={weights} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'recipes' && <div className="py-10 px-4"><Recipes recipes={recipes} /></div>}
        {activeTab === 'gallery' && <div className="py-10 px-4"><Gallery images={galleryImages} /></div>}
        {activeTab === 'roadbook' && <Roadbook entries={roadbookEntries} />}
        {activeTab === 'admin' && ( <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in"> {!isAdminAuthenticated ? <AdminLoginView /> : ( <div className="space-y-8"><div className="flex justify-between items-center border-b pb-6"><h2 className="text-2xl font-bold">Admin</h2><button onClick={() => setIsAdminAuthenticated(false)} className="text-red-400 font-bold uppercase text-sm">Abmelden</button></div><BMIBox currentWeight={currentWeight} /><AdminLogin onLogin={() => {}} onAddRecipe={handleAddRecipe} onAddGalleryImage={handleAddGalleryImage} onAddRoadbookEntry={handleAddRoadbookEntry} /><div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 text-center mt-8"><h3 className="font-bold mb-4">Gewicht verwalten</h3><button onClick={() => setIsModalOpen(true)} className={`px-8 py-4 rounded-full font-bold text-lg ${gradientButtonClass}`}>+ Gewicht eintragen</button><div className="mt-8 text-left bg-white p-4 rounded-xl border-2 border-slate-100"><HistoryList weights={weights} onDelete={handleDelete} /></div></div></div> )} </div> )}
        {activeTab === 'about' && <div className="py-10 px-4"><AboutMe /></div>}
        {activeTab === 'impressum' && <div className="py-10 px-4"><Impressum /></div>}
        {activeTab === 'datenschutz' && <div className="py-10 px-4"><Datenschutz /></div>}
      </div>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800 mt-auto">
        
        {/* SOCIAL MEDIA ICONS (HIER SIND DEINE LINKS) */}
        <div className="flex justify-center gap-6 mb-6">
          {/* Instagram (Noch Platzhalter, da Seite nicht geht) */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00cca0] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          {/* Facebook (Dein echter Link ist drin!) */}
          <a href="https://www.facebook.com/profile.php?id=61585446423634" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0ea5e9] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
        </div>

        <div className="flex justify-center gap-6 mb-4 text-sm font-bold uppercase tracking-widest"><button onClick={() => navigateTo('impressum')} className="hover:text-white">Impressum</button><button onClick={() => navigateTo('datenschutz')} className="hover:text-white">Datenschutz</button></div>
        <p className="text-xs text-slate-600">© {new Date().getFullYear()} René's Road to 85</p>
      </footer>
    </div>
  );
}