# Guia de Desenvolvimento

## ❗ Etapas

- Copiar Projeto Base [login-nextjs](https://github.com/rafmco/login-nextjs)

- Criar conta [Firebase](https://firebase.google.com/)
  - Acesse o Console
    - Criar Projeto
    - Acessar 'Configurações do Projeto -> Geral'
      - Adicionar Aplicativo da Web
      - Registrar
      - Instalar SDK Firebase
        - `npm install firebase`
      - Salvar Firebase configuration
      - Configurar '/firebase.ts' com o snippet gerado pelo FCM
      - Configurar ServiceWorker em JavaScript com a mesma firebaseConfig:
        - '/public/firebase-messaging-sw.js'
    - Acessar 'Configurações do Projeto -> Contas de Serviço'
      - Gerar nova Chave Privada
        - Copiar arquivo baixado para raiz do projeto
        - Renomear para 'service_key.json'
      - Instalar lib [Firebase Admin](https://www.npmjs.com/package/firebase-admin)
        - `npm i firebase-admin`
      - Configurar Send Notification Route
        - '/app/send-notification/route.ts'
     - Acessar 'Configurações do Projeto -> Cloud Messaging'
       - Gerar KEY PAIR
       - Adicionar ao .ENV
         - NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY=???

- Para usar ServiceWorkers, altere a configuração de 'scripts' em 'package.json':
  - `"dev": "next dev --experimental-https",`

- Instalação dos componentes Shadcn:
  - `npx shadcn-ui@latest add sonner`
 
- Configuração HookFCMToken
  - '/hooks/useFcmToken.tsx
