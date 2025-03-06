import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Facebook,
  Twitter,
  Calendar,
  Languages,
  CreditCard,
  Briefcase,
  Edit,
  Upload,
  Check,
  X,
  Save,
  Plus
} from 'lucide-react';
import Header from './HeaderEntre';
import useProfile from '../../hooks/useProfile';

const companyTypes = [
  { value: "SARL", label: "SARL - Société à responsabilité limitée" },
  { value: "SA", label: "SA - Société anonyme" },
  { value: "SAS", label: "SAS - Société par actions simplifiée" },
  { value: "SASU", label: "SASU - Société par actions simplifiée unipersonnelle" },
  { value: "EURL", label: "EURL - Entreprise unipersonnelle à responsabilité limitée" },
  { value: "SNC", label: "SNC - Société en nom collectif" },
  { value: "SCI", label: "SCI - Société civile immobilière" },
  { value: "EI", label: "EI - Entreprise individuelle" },
  { value: "EIRL", label: "EIRL - Entreprise individuelle à responsabilité limitée" },
  { value: "Micro-entreprise", label: "Micro-entreprise" },
  { value: "Association", label: "Association" },
  { value: "Autre", label: "Autre" }
];

const languageOptions = [
  { value: "fr", label: "Français" },
  { value: "en", label: "Anglais" },
  { value: "es", label: "Espagnol" },
  { value: "de", label: "Allemand" },
  { value: "it", label: "Italien" },
  { value: "pt", label: "Portugais" },
  { value: "ar", label: "Arabe" }
];

const paymentMethods = [
  { value: "bank_transfer", label: "Virement bancaire" },
  { value: "credit_card", label: "Carte bancaire" },
  { value: "paypal", label: "PayPal" },
  { value: "check", label: "Chèque" },
  { value: "cash", label: "Espèces" }
];

const predefinedLogos = [
  { id: 1, url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&h=128&fit=crop", name: "Tech Logo 1" },
  { id: 2, url: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=128&h=128&fit=crop", name: "Tech Logo 2" },
  { id: 3, url: "https://images.unsplash.com/photo-1622673038491-b550fa0dda4e?w=128&h=128&fit=crop", name: "Tech Logo 3" }
];

export default function SettingsPage() {
  const { profile, loading, error,programme } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const registrationDocRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "TechSecure Solutions",
    description: "Leader in cybersecurity solutions and vulnerability management",
    type: "SARL",
    secteur: "Cybersécurité",
    num_identification: "FR123456789",
    localisation: {
      pays: "France",
      ville: "Paris"
    },
    statut_actuel: "Active",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&h=128&fit=crop",
    registre_commerce: null as File | null,
    contact: {
      fix: "+225 66568804",
      email: "contact@techsecure.com",
      adresse: "123 Avenue de la Cybersécurité, 75001 Paris",
      urlSite: "https://techsecure.com",
      reseaux_sociaux: {
        linkedin: "https://linkedin.com/company/techsecure",
        facebook: "https://facebook.com/techsecure",
        twitter: "https://twitter.com/techsecure"
      },
      responsable: {
        nom: "Marie Dubois",
        telephone: "+33 6 12 34 56 78"
      }
    },
    financial: {
      date_creation: "2020-01-15",
      langues: ["Français", "Anglais", "Espagnol"],
      modes_paiement: ["Virement bancaire", "Carte bancaire", "PayPal"],
      services: ["Audit de sécurité", "Tests d'intrusion", "Formation"]
    }
  });

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegistrationDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        registre_commerce: file
      }));
    }
  };

  const handlePredefinedLogo = (logoUrl: string) => {
    setFormData(prev => ({
      ...prev,
      logo: logoUrl
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
  };

  return (
    <div className="flexmin-h-screen bg-gray-900 text-gray-100 ">
      <div className="flex-1 min-w-0 p-4 lg:p-8">
        <Header />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-4 md:p-6 mb-8 border border-gray-700 relative"
        >

          <div className="absolute top-4 md:top-6 right-4 md:right-6 flex space-x-2">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Save className="h-5 w-5 mr-1" />
                  Sauvegarder
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <Edit className="h-5 w-5 mr-1" />
                Modifier
              </button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={programme?.name}
                alt={formData.name}
                className="w-24 h-24 rounded-lg object-cover border-4 border-gray-700"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-800 p-2 rounded-full hover:bg-gray-700"
                  >
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-2xl md:text-3xl font-bold bg-gray-700 text-white rounded px-2 py-1 w-full mb-2"
                />
              ) : (
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{formData.name}</h1>
              )}
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-gray-700 text-gray-300 rounded px-2 py-1"
                  rows={2}
                />
              ) : (
                <p className="text-gray-400 max-w-2xl">{formData.description}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-4 border-t border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Logos prédéfinis</h3>
              <div className="flex space-x-4">
                {predefinedLogos.map(logo => (
                  <button
                    key={logo.id}
                    onClick={() => handlePredefinedLogo(logo.url)}
                    className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-primary-500 transition-colors"
                  >
                    <img src={logo.url} alt={logo.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-primary-500" />
              Informations de l'entreprise
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Type d'entreprise</label>
                {isEditing ? (
                  <Select
                    value={companyTypes.find(type => type.value === formData.type)}
                    onChange={(option) => setFormData(prev => ({ ...prev, type: option?.value || '' }))}
                    options={companyTypes}
                    className="text-gray-900"
                  />
                ) : (
                  <p className="text-white">{formData.type}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Secteur d'activité</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.secteur}
                    onChange={(e) => setFormData(prev => ({ ...prev, secteur: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded px-2 py-1"
                  />
                ) : (
                  <p className="text-white">{formData.secteur}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Numéro d'identification</label>
                <p className="text-white">{formData.num_identification}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Localisation</label>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.localisation.pays}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        localisation: { ...prev.localisation, pays: e.target.value }
                      }))}
                      placeholder="Pays"
                      className="w-full bg-gray-700 text-white rounded px-2 py-1"
                    />
                    <input
                      type="text"
                      value={formData.localisation.ville}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        localisation: { ...prev.localisation, ville: e.target.value }
                      }))}
                      placeholder="Ville"
                      className="w-full bg-gray-700 text-white rounded px-2 py-1"
                    />
                  </div>
                ) : (
                  <p className="text-white flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    {formData.localisation.ville}, {formData.localisation.pays}
                  </p>
                )}
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Statut</label>
                {isEditing ? (
                  <select
                    value={formData.statut_actuel}
                    onChange={(e) => setFormData(prev => ({ ...prev, statut_actuel: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded px-2 py-1"
                  >
                    <option value="Active">Actif</option>
                    <option value="Inactive">Inactif</option>
                  </select>
                ) : (
                  <span className={`ml-2 px-2 py-1 text-sm rounded-full ${
                    formData.statut_actuel === 'Active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {formData.statut_actuel === 'Active' ? 'Actif' : 'Inactif'}
                  </span>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400">Registre de commerce</label>
                <div className="mt-2">
                  <input
                    type="file"
                    ref={registrationDocRef}
                    onChange={handleRegistrationDoc}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <button
                    onClick={() => registrationDocRef.current?.click()}
                    className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{formData.registre_commerce ? formData.registre_commerce.name : 'Télécharger le document'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-primary-500" />
              Informations de contact
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Responsable</label>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.contact.responsable.nom}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          responsable: { ...prev.contact.responsable, nom: e.target.value }
                        }
                      }))}
                      placeholder="Nom du responsable"
                      className="w-full bg-gray-700 text-white rounded px-2 py-1"
                    />
                    <input
                      type="text"
                      value={formData.contact.responsable.telephone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          responsable: { ...prev.contact.responsable, telephone: e.target.value }
                        }
                      }))}
                      placeholder="Téléphone du responsable"
                      className="w-full bg-gray-700 text-white rounded px-2 py-1"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-white">{formData.contact.responsable.nom}</p>
                    <p className="text-gray-400">{formData.contact.responsable.telephone}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                    className="w-full bg-gray-700 text-white rounded px-2 py-1"
                  />
                ) : (
                  <a href={`mailto:${formData.contact.email}`} className="text-primary-400 hover:underline">
                    {formData.contact.email}
                  </a>
                )}
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.contact.fix}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, fix: e.target.value }
                    }))}
                    className="w-full bg-gray-700 text-white rounded px-2 py-1"
                  />
                ) : (
                  <p>{formData.contact.fix}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.contact.adresse}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, adresse: e.target.value }
                    }))}
                    className="w-full bg-gray-700 text-white rounded px-2 py-1"
                  />
                ) : (
                  <p>{formData.contact.adresse}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-500" />
                {isEditing ? (
                  <input
                    type="url"
                    value={formData.contact.urlSite}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, urlSite: e.target.value }
                    }))}
                    className="w-full bg-gray-700 text-white rounded px-2 py-1"
                  />
                ) : (
                  <a href={formData.contact.urlSite} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">
                    {formData.contact.urlSite}
                  </a>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-400">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.contact.reseaux_sociaux.linkedin}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          reseaux_sociaux: { ...prev.contact.reseaux_sociaux, linkedin: e.target.value }
                        }
                      }))}
                      className="w-full bg-gray-700 text-white rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Facebook</label>
                    <input
                      type="url"
                      value={formData.contact.reseaux_sociaux.facebook}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          reseaux_sociaux: { ...prev.contact.reseaux_sociaux, facebook: e.target.value }
                        }
                      }))}
                      className="w-full bg-gray-700 text-white rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Twitter</label>
                    <input
                      type="url"
                      value={formData.contact.reseaux_sociaux.twitter}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          reseaux_sociaux: { ...prev.contact.reseaux_sociaux, twitter: e.target.value }
                        }
                      }))}
                      className="w-full bg-gray-700 text-white rounded px-2 py-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4 mt-4">
                  <a href={formData.contact.reseaux_sociaux.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={formData.contact.reseaux_sociaux.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={formData.contact.reseaux_sociaux.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Financial Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 md:col-span-2"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-primary-500" />
              Informations complémentaires
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <h3 className="text-sm text-gray-400 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Date de création
                </h3>
                <p className="text-white">{new Date(formData.financial.date_creation).toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 mb-2 flex items-center">
                  <Languages className="h-4 w-4 mr-1" />
                  Langues
                </h3>
                {isEditing ? (
                  <Select
                    isMulti
                    value={languageOptions.filter(option => 
                      formData.financial.langues.includes(option.label)
                    )}
                    onChange={(selected) => {
                      const selectedLanguages = selected.map(option => option.label);
                      setFormData(prev => ({
                        ...prev,
                        financial: { ...prev.financial, langues: selectedLanguages }
                      }));
                    }}
                    options={languageOptions}
                    className="text-gray-900"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.financial.langues.map((langue) => (
                      <span key={langue} className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                        {langue}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 mb-2 flex items-center">
                  <CreditCard className="h-4 w-4 mr-1" />
                  Modes de paiement
                </h3>
                {isEditing ? (
                  <Select
                    isMulti
                    value={paymentMethods.filter(option => 
                      formData.financial.modes_paiement.includes(option.label)
                    )}
                    onChange={(selected) => {
                      const selectedMethods = selected.map(option => option.label);
                      setFormData(prev => ({
                        ...prev,
                        financial: { ...prev.financial, modes_paiement: selectedMethods }
                      }));
                    }}
                    options={paymentMethods}
                    className="text-gray-900"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.financial.modes_paiement.map((mode) => (
                      <span key={mode} className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                        {mode}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm text-gray-400 mb-2">Services proposés</h3>
              {isEditing ? (
                <div className="space-y-2">
                  {formData.financial.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => {
                          const newServices = [...formData.financial.services];
                          newServices[index] = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            financial: { ...prev.financial, services: newServices }
                          }));
                        }}
                        className="flex-1 bg-gray-700 text-white rounded px-2 py-1"
                      />
                      <button
                        onClick={() => {
                          const newServices = formData.financial.services.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            financial: { ...prev.financial, services: newServices }
                          }));
                        }}
                        className="text-red-500 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                         financial: { ...prev.financial, services: [...prev.financial.services, ''] }
                      }));
                    }}
                    className="flex items-center space-x-2 text-primary-400 hover:text-primary-300"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ajouter un service</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formData.financial.services.map((service) => (
                    <div key={service} className="bg-gray-700 p-4 rounded-lg">
                      <Check className="h-4 w-4 text-primary-500 mb-2" />
                      <p className="text-sm">{service}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}