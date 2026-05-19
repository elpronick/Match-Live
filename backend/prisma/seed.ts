import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/db/prisma.js';

async function main() {
  console.log('🌱 Iniciando la generación de datos falsos (Seed)...');

  // Limpiar la base de datos actual (opcional, pero útil para empezar fresco)
  // Cuidado: deleteMany borrará todo
  await prisma.savedProperty.deleteMany();
  await prisma.room.deleteMany();
  await prisma.profile.deleteMany();
  
  // Vamos a borrar sólo los usuarios de prueba o todos (esto es un seed de prueba)
  await prisma.user.deleteMany({
    where: { email: { contains: 'test' } }
  });

  const passwordHash = await bcrypt.hash('123456', 10);

  const usersData = [
    {
      name: 'Laura García', email: 'laura1@correo.com', city: 'Madrid', budget: 500, lifestyle: 'Trabajador remoto',
      description: 'Soy diseñadora gráfica, trabajo desde casa y busco un piso tranquilo para compartir.',
      room: { title: 'Habitación luminosa en Malasaña', location: 'Malasaña, Madrid', price: 460, imageUrl: 'https://images.pexels.com/photos/20725941/pexels-photo-20725941.jpeg', description: 'Habitación amplia con ventana al exterior. Ambiente muy tranquilo.' }
    },
    {
      name: 'Carlos Martínez', email: 'carlos1@correo.com', city: 'Valencia', budget: 450, lifestyle: 'Estudiante',
      description: 'Estudio un máster, me gusta socializar pero respeto las horas de estudio.',
      room: { title: 'Habitación para estudiantes', location: 'Ruzafa, Valencia', price: 435, imageUrl: 'https://images.pexels.com/photos/20725943/pexels-photo-20725943.jpeg', description: 'Piso de estudiantes cerca del metro y la universidad.' }
    },
    {
      name: 'Ana y Lucía', email: 'ana1@correo.com', city: 'Barcelona', budget: 650, lifestyle: 'Social y activo',
      description: 'Somos dos amigas buscando una tercera persona para alquilar juntas.',
      room: { title: 'Habitación cerca de la playa', location: 'Poblenou, Barcelona', price: 600, imageUrl: 'https://images.pexels.com/photos/27683999/pexels-photo-27683999.jpeg', description: 'Piso a 10 minutos de la playa. Ideal para disfrutar de la ciudad.' }
    },
    {
      name: 'Marcos Ruiz', email: 'marcos1@correo.com', city: 'Sevilla', budget: 550, lifestyle: 'Tranquilo y casero',
      description: 'Músico y creativo, me gusta el arte y la tranquilidad.',
      room: { title: 'Habitación tranquila con vibe creativa', location: 'Triana, Sevilla', price: 525, imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80', description: 'Perfecto para artistas o personas que buscan paz.' }
    },
    {
      name: 'Elena Gómez', email: 'elena1@correo.com', city: 'Madrid', budget: 600, lifestyle: 'Deportista',
      description: 'Me encanta correr por el retiro y llevar una vida sana. Busco compis parecidos.',
      room: { title: 'Habitación frente al parque', location: 'Retiro, Madrid', price: 580, imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80', description: 'Luminosa y con balcón. Justo enfrente del Retiro.' }
    },
    {
      name: 'Javier Soto', email: 'javi1@correo.com', city: 'Barcelona', budget: 700, lifestyle: 'Nocturno',
      description: 'Trabajo en hostelería, mis horarios son raros pero soy súper respetuoso.',
      room: { title: 'Dormitorio acogedor en el Gótico', location: 'Barrio Gótico, Barcelona', price: 650, imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', description: 'Cama doble, armario grande y muy céntrico.' }
    },
    {
      name: 'Sara Jiménez', email: 'sara1@correo.com', city: 'Valencia', budget: 400, lifestyle: 'Madrugador',
      description: 'Me levanto temprano para hacer yoga. Busco paz en la casa.',
      room: { title: 'Habitación zen en Benimaclet', location: 'Benimaclet, Valencia', price: 380, imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80', description: 'Cama y escritorio. Muy buena luz natural y silencio.' }
    },
    {
      name: 'Daniel Blanco', email: 'dani1@correo.com', city: 'Sevilla', budget: 500, lifestyle: 'Trabajador remoto',
      description: 'Informático, setup de 2 pantallas. Suelo cocinar para toda la casa.',
      room: { title: 'Habitación espaciosa con escritorio', location: 'Nervión, Sevilla', price: 450, imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80', description: 'Espacio enorme, ideal para teletrabajar. A/C incluido.' }
    },
    {
      name: 'Clara del Bosque', email: 'clara1@correo.com', city: 'Bilbao', budget: 450, lifestyle: 'Social y activo',
      description: 'Siempre organizo planes el fin de semana. Busco amig@s, no solo compis.',
      room: { title: 'Piso moderno en Abando', location: 'Abando, Bilbao', price: 420, imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55dd1b4594c?auto=format&fit=crop&w=600&q=80', description: 'Habitación con cama grande y baño compartido con 1 persona.' }
    },
    {
      name: 'Víctor R.', email: 'vic1@correo.com', city: 'Zaragoza', budget: 350, lifestyle: 'Estudiante',
      description: 'Todo el día en la biblioteca. En casa solo duermo y ceno.',
      room: { title: 'Dormitorio económico', location: 'Delicias, Zaragoza', price: 320, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80', description: 'Muy barato y con calefacción central.' }
    },
    {
      name: 'Martina y Leo', email: 'marti1@correo.com', city: 'Madrid', budget: 900, lifestyle: 'Tranquilo y casero',
      description: 'Somos pareja, tenemos 2 gatitos muy buenos.',
      room: { title: 'Habitación doble grande', location: 'Chamberí, Madrid', price: 850, imageUrl: 'https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=600&q=80', description: 'Habitación enorme para parejas. Aceptamos mascotas.' }
    },
    {
      name: 'Luis Méndez', email: 'luis1@correo.com', city: 'Málaga', budget: 550, lifestyle: 'Trabajador remoto',
      description: 'Nómada digital, busco sol y buena conexión a internet.',
      room: { title: 'Habitación cerca del centro', location: 'La Malagueta, Málaga', price: 500, imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80', description: 'A dos pasos de la playa y del centro.' }
    },
    {
      name: 'Andrea Navarro', email: 'andrea1@correo.com', city: 'Granada', budget: 300, lifestyle: 'Social y activo',
      description: 'Estudiante Erasmus. ¡Quiero aprender español y salir de tapas!',
      room: { title: 'Habitación en el Albaicín', location: 'Albaicín, Granada', price: 280, imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80', description: 'Vistas a la Alhambra desde la ventana.' }
    },
    {
      name: 'Sergio Pons', email: 'sergio1@correo.com', city: 'Alicante', budget: 400, lifestyle: 'Deportista',
      description: 'Surfero, limpio y muy ordenado en casa.',
      room: { title: 'Piso luminoso', location: 'San Juan, Alicante', price: 350, imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80', description: 'Terraza grande para guardar tablas de surf.' }
    },
    {
      name: 'Carmen Torres', email: 'carmen1@correo.com', city: 'Barcelona', budget: 750, lifestyle: 'Tranquilo y casero',
      description: 'Médico residente. En casa quiero silencio total para descansar.',
      room: { title: 'Habitación tipo suite con baño', location: 'Eixample, Barcelona', price: 720, imageUrl: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=600&q=80', description: 'Suite con baño privado. Muy insonorizada.' }
    }
  ];

  for (const data of usersData) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        profile: {
          create: {
            city: data.city,
            budget: data.budget,
            lifestyle: data.lifestyle,
            description: data.description,
          }
        },
        rooms: {
          create: {
            title: data.room.title,
            location: data.room.location,
            price: data.room.price,
            imageUrl: data.room.imageUrl,
            description: data.room.description,
            isAvailable: true
          }
        }
      }
    });
    console.log(`Creado usuario: ${user.name} con su perfil y habitación.`);
  }

  console.log('✅ ¡Seed completado con éxito!');
}

main()
  .catch((e) => {
    console.error('Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
