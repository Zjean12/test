import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1 */}
          <div>
            <h3 className="text-cyan-400 text-xl font-semibold mb-4">À Propos</h3>
            <p className="text-sm">
              Notre mission est de connecter les entreprises et les hackers
              éthiques pour un monde numérique plus sûr.
            </p>
          </div>

          {/* Colonne 2 */}
          <div>
            <h3 className="text-cyan-400 text-xl font-semibold mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/entreprise/register" className="hover:text-cyan-300 transition">
                  Rejoindre en tant qu'Entreprise
                </Link>
              </li>
              <li>
                <Link to="/hacker/register" className="hover:text-cyan-300 transition">
                  Rejoindre en tant que Hacker
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-cyan-300 transition">
                  Programmes en Vedette
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 */}
          <div>
            <h3 className="text-cyan-400 text-xl font-semibold mb-4">Contact</h3>
            <p>Email : <a href="mailto:contact@cybersecure.com" className="hover:text-cyan-300 transition">contact@cybersecure.com</a></p>
            <p>Téléphone : +225 01 23 45 67 89</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          © {new Date().getFullYear()} IlimiGroup. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
