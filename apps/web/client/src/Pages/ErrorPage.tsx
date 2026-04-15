import { motion } from "framer-motion";
import { BookTextIcon, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 transition-colors duration-300 dark:bg-black">
      <div className="w-full max-w-md space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black transition-colors duration-300 dark:bg-white">
            <BookTextIcon className="h-10 w-10 text-white dark:text-black" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="mb-2 text-8xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">
            404
          </h1>
          <p className="text-gray-600 transition-colors duration-300 dark:text-gray-400">
            Page not found
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3"
        >
          <p className="text-lg text-gray-600 transition-colors duration-300 dark:text-gray-400">
            We couldn't find the page you're looking for. It might have been
            moved or deleted.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-4 pt-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-medium text-white shadow-lg transition-all duration-800 hover:shadow-2xl dark:bg-white dark:text-black"
            >
              <Home className="h-5 w-5" />
              Go Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
