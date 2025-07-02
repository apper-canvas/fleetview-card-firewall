import { motion } from 'framer-motion';

const Loading = ({ type = 'default' }) => {
  if (type === 'map') {
    return (
      <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-full w-full bg-gradient-to-br from-slate-700 to-slate-800 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/20 to-transparent animate-pulse" />
            <div className="absolute top-4 left-4 w-32 h-8 bg-slate-700 rounded" />
            <div className="absolute top-4 right-4 w-24 h-8 bg-slate-700 rounded" />
            <div className="absolute bottom-4 left-4 w-48 h-12 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'vehicles') {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-slate-600 rounded-lg p-4"
          >
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="w-24 h-6 bg-slate-600 rounded" />
                <div className="w-16 h-5 bg-slate-600 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="w-32 h-4 bg-slate-700 rounded" />
                <div className="w-20 h-4 bg-slate-700 rounded" />
                <div className="w-28 h-4 bg-slate-700 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'analytics') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-slate-600 rounded-lg p-6"
          >
            <div className="animate-pulse">
              <div className="w-8 h-8 bg-slate-600 rounded mb-4" />
              <div className="w-16 h-8 bg-slate-600 rounded mb-2" />
              <div className="w-24 h-4 bg-slate-700 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;