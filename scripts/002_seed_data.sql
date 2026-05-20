-- Seed initial data for the site

-- Insert default site settings (key, value, type columns only)
INSERT INTO site_settings (key, value, type) VALUES
('site_tagline', 'Votre partenaire officiel pour une connectivité meilleure', 'text'),
('whatsapp_number', '+243 979 213 370', 'text'),
('email', 'nathangroup02@gmail.com', 'text'),
('phone_secondary', '+243 890 868 095', 'text'),
('working_hours', 'Lun-Ven: 8h-18h | Sam: 9h-14h', 'text')
ON CONFLICT (key) DO NOTHING;

-- Insert addresses (city, address, phone, is_active, sort_order)
INSERT INTO addresses (city, address, phone, is_active, sort_order) VALUES
('Kinshasa', 'AV. KAUKA 53-73, IMM MAISHA-PARK, Q/BATETELA, C/GOMBE', '+243 979 213 370', true, 1),
('Goma', 'Q/MABANGA-SUD, AV.MUTONGO, C/KARISIMBI N 007', '+243 979 213 370', true, 2),
('Bunia', 'Q/BAKONKO, Av.MANIEMA, C/MBUNYA N 019', '+243 979 213 370', true, 3)
ON CONFLICT DO NOTHING;

-- Insert equipment products (name, description, price, image_url, category, is_active, is_featured, payment_link, sort_order)
INSERT INTO equipment (name, description, price, image_url, category, is_active, is_featured, payment_link, sort_order) VALUES
('Starlink Standard', 'Kit complet avec antenne, routeur et câbles. Idéal pour les maisons et petites entreprises.', 450, '/images/starlink-standard.png', 'Kit Résidentiel', true, true, 'https://wa.me/243979213370?text=Je souhaite commander le Starlink Standard', 1),
('Starlink Business', 'Solution haute performance pour entreprises avec priorité réseau et support dédié.', 2500, '/images/starlink-business.png', 'Kit Business', true, true, 'https://wa.me/243979213370?text=Je souhaite commander le Starlink Business', 2),
('Starlink Mobile', 'Kit portable pour une connectivité en déplacement. Parfait pour les voyageurs.', 599, '/images/starlink-mobile.png', 'Kit Mobile', true, false, 'https://wa.me/243979213370?text=Je souhaite commander le Starlink Mobile', 3),
('Support Mural', 'Support de montage mural robuste pour une installation sécurisée.', 75, '/images/support-mural.png', 'Accessoire', true, false, 'https://wa.me/243979213370?text=Je souhaite commander un Support Mural', 4),
('Câble Ethernet 25m', 'Câble Ethernet haute qualité de 25 mètres pour extension de réseau.', 45, '/images/cable-ethernet.png', 'Accessoire', true, false, 'https://wa.me/243979213370?text=Je souhaite commander un Câble Ethernet 25m', 5),
('Mesh Router', 'Routeur mesh pour étendre la couverture WiFi dans toute la maison.', 199, '/images/mesh-router.png', 'Accessoire', true, false, 'https://wa.me/243979213370?text=Je souhaite commander un Mesh Router', 6)
ON CONFLICT DO NOTHING;

-- Insert services (title, description, icon, image_url, is_active, sort_order)
INSERT INTO services (title, description, icon, is_active, sort_order) VALUES
('Installation Professionnelle', 'Installation complète par nos techniciens certifiés avec garantie de service.', 'wrench', true, 1),
('Support Technique 24/7', 'Assistance technique disponible à tout moment pour résoudre vos problèmes.', 'headphones', true, 2),
('Maintenance Préventive', 'Programme de maintenance pour garantir des performances optimales.', 'settings', true, 3)
ON CONFLICT DO NOTHING;

-- Insert hero slides (title, subtitle, description, image_url, button_text, button_link, is_active, sort_order)
INSERT INTO hero_slides (title, subtitle, description, image_url, button_text, button_link, is_active, sort_order) VALUES
('Internet Haut Débit Partout en RDC', 'Connectez-vous au monde avec Starlink', 'Même dans les zones les plus reculées, profitez d''une connexion internet rapide et fiable.', '/images/hero-1.jpg', 'Découvrir nos offres', '/equipements', true, 1),
('Installation Professionnelle', 'Nos experts certifiés', 'Nos techniciens assurent une installation parfaite de votre équipement Starlink.', '/images/hero-2.jpg', 'Nos services', '/services', true, 2)
ON CONFLICT DO NOTHING;
