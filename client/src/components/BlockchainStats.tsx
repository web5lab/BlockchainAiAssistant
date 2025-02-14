import { motion } from "framer-motion";
import { Activity, Box, Cpu } from "lucide-react";

export default function BlockchainStats() {
  return (
    <motion.div 
      className="grid grid-cols-3 gap-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Block Time */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-300/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-white/10 backdrop-blur-sm border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Box className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">Latest Block</span>
          </div>
          <motion.div 
            className="text-2xl font-mono text-orange-600"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            #18392041
          </motion.div>
        </div>
      </div>

      {/* Network Hash Rate */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-300/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-white/10 backdrop-blur-sm border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">Hash Rate</span>
          </div>
          <motion.div 
            className="text-2xl font-mono text-orange-600"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            892.4 TH/s
          </motion.div>
        </div>
      </div>

      {/* Network Activity */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-300/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-white/10 backdrop-blur-sm border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">TPS</span>
          </div>
          <motion.div 
            className="text-2xl font-mono text-orange-600"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            2,481
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
