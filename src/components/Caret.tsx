import { motion } from "framer-motion"

const Caret = () => {
    // ‌aria-hidden="true"的主要作用是指示辅助技术忽略特定的HTML元素,使其在‌屏幕阅读器等辅助设备中不可见,从而减少冗余信息的输出,提高网页的可访问性
    return (
        <motion.div aria-hidden={true} className="inline-block bg-primary-500 w-0.5 h-7" initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} />
    )
}

export default Caret