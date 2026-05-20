-- Update site settings with new email and secondary phone
UPDATE site_settings SET value = 'nathangroup02@gmail.com' WHERE key = 'email';

-- Insert secondary phone if not exists
INSERT INTO site_settings (key, value, type) 
VALUES ('phone_secondary', '+243 890 868 095', 'text')
ON CONFLICT (key) DO UPDATE SET value = '+243 890 868 095';
