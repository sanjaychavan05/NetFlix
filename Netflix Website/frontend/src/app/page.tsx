'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';

// Static Indian movie data using YouTube thumbnails and trailer links
const MOVIE_ROWS = [
  {
    title: 'Malayalam Blockbusters',
    movies: [
      {
        imageUrl: 'https://img.youtube.com/vi/BVgNoVwsb6Y/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=BVgNoVwsb6Y',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/scRQR-FRfIo/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=scRQR-FRfIo',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/D76XBkNoeac/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=D76XBkNoeac',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/H-j9T0oiC6M/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=H-j9T0oiC6M',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/hwl9XluBtJY/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=hwl9XluBtJY',
      },
    ],
  },
  {
    title: 'South India Songs',
    movies: [
      {
        imageUrl: 'https://img.youtube.com/vi/sAzlWScHTc4/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=sAzlWScHTc4',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/5vsOv_bcnhs/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=5vsOv_bcnhs',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/ffcOcghuYFM/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ffcOcghuYFM',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/rwA4N8pj1XA/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=rwA4N8pj1XA',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/YR12Z8f1Dh8/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=YR12Z8f1Dh8',
      },
    ],
  },
  {
    title: 'Indian Biopics Movies',
    movies: [
      {
        imageUrl: 'https://img.youtube.com/vi/gzUu-FJ7s-Y/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=gzUu-FJ7s-Y',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/reuPpCS_GcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=reuPpCS_GcQ',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/FLd_ZeEe9pc/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=FLd_ZeEe9pc',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/QgxvDORKzec/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=QgxvDORKzec',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/L1NfeFLdwqY/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=L1NfeFLdwqY',
      },
    ],
  },
  {
    title: 'Kannada Short Movies',
    movies: [
      {
        imageUrl: 'https://img.youtube.com/vi/Y8ZApXcnhy4/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Y8ZApXcnhy4',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/TMY1g8pAktk/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=TMY1g8pAktk',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/RVMnT4nq9NU/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=RVMnT4nq9NU',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/Ypt7g7fOvWA/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Ypt7g7fOvWA',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/1M7iX-XWRT8/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=1M7iX-XWRT8',
      },
    ],
  },
  {
    title: 'Kannada Songs',
    movies: [
      {
        imageUrl: 'https://img.youtube.com/vi/palMj0iq-3g/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=palMj0iq-3g',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/6FTnjjxmVTE/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=6FTnjjxmVTE',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/mmyWqBkX-Bw/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=mmyWqBkX-Bw',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/O4SHoP6qVuc/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=O4SHoP6qVuc',
      },
      {
        imageUrl: 'https://img.youtube.com/vi/FRdC3FDIrX0/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=FRdC3FDIrX0',
      },
    ],
  },
];

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const heroVideoUrl = 'https://www.youtube.com/watch?v=0PfErHA3zzQ';// Toxic movie trailer
  const heroImageUrl = 'https://img.youtube.com/vi/0PfErHA3zzQ/maxresdefault.jpg';

  const heroMovieInfo = {
    title: 'Toxic',
    description: 'A Fairy Tale for Grown-Ups. Rocking Star Yash returns in this epic thriller directed by Geetu Mohandas. Starring Yash, Kiara Advani, Nayanthara, Huma Qureshi, Tara Sutaria, and Rukmini Vasanth.',
    releaseDate: 'March 19, 2026',
    genre: 'Thriller, Action',
    director: 'Geetu Mohandas',
  };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }
    api
      .get('/auth/me')
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar user={user} />
      <main className="pt-16">
        {/* Hero banner */}
        <section className="relative h-[70vh] min-h-[400px] flex items-end pb-24 px-8">
          <div className="absolute inset-0">
            {!heroImageError ? (
              <img
                src={heroImageUrl}
                alt="Toxic Movie Trailer"
                className="w-full h-full object-cover"
                onError={() => {
                  setHeroImageError(true);
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#e50914] to-[#141414] flex items-center justify-center">
                <p className="text-white text-2xl font-bold">Toxic</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
          </div>
          <motion.div
            className="relative max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Toxic
            </h1>
            <p className="text-lg text-white/90 mb-6">
              A Fairy Tale for Grown-Ups. Rocking Star Yash returns in this epic thriller.
            </p>
            <div className="flex gap-3">
              <motion.button
                onClick={() => window.open(heroVideoUrl, '_blank', 'noopener,noreferrer')}
                className="px-8 py-3 bg-white text-black font-semibold rounded flex items-center gap-2 hover:bg-white/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                ▶ Play
              </motion.button>
              <motion.button
                onClick={() => setShowInfoModal(true)}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded flex items-center gap-2 hover:bg-white/30 backdrop-blur"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                ℹ More Info
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Movie rows */}
        <section className="px-8 -mt-16 space-y-10 pb-16">
          {MOVIE_ROWS.map((row, rowIndex) => (
            <motion.div
              key={row.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * rowIndex }}
            >
              <h2 className="text-xl font-bold mb-4">{row.title}</h2>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {row.movies.map((movie, i) => (
                  <MovieCard
                    key={movie.title}
                    title={movie.title}
                    imageUrl={movie.imageUrl}
                    videoUrl={movie.videoUrl}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      {/* Info Modal */}
      {showInfoModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowInfoModal(false)}
        >
          <motion.div
            className="bg-[#181818] rounded-lg max-w-2xl w-full mx-4 p-8 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold mb-4">{heroMovieInfo.title}</h2>
            <div className="space-y-3 text-white/80">
              <p className="text-lg">{heroMovieInfo.description}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div>
                  <span className="text-white/60">Release Date:</span>
                  <span className="ml-2">{heroMovieInfo.releaseDate}</span>
                </div>
                <div>
                  <span className="text-white/60">Genre:</span>
                  <span className="ml-2">{heroMovieInfo.genre}</span>
                </div>
                <div>
                  <span className="text-white/60">Director:</span>
                  <span className="ml-2">{heroMovieInfo.director}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <motion.button
                onClick={() => {
                  window.open(heroVideoUrl, '_blank', 'noopener,noreferrer');
                  setShowInfoModal(false);
                }}
                className="px-6 py-2 bg-[#e50914] text-white font-semibold rounded hover:bg-[#f40612]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                ▶ Watch Trailer
              </motion.button>
              <motion.button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2 bg-white/20 text-white font-semibold rounded hover:bg-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
