"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2 } from "lucide-react";

interface NewsCardProps {
  id: string | number;
  time: string;
  title: string;
  description: string;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  time,
  title,
  description,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();

  const handleView = () => {
    router.push(`/news/${id}`);
  };

  return (
    <article
      className="w-full bg-white rounded-lg shadow-sm border border-gray-200
                 px-5 py-4 flex flex-col justify-between
                 max-h-36 min-h-[11rem] h-40"
      role="article"
      aria-label={title}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className="text-base font-semibold text-gray-900 truncate"
            title={title}
          >
            {title}
          </h3>
        </div>
      </header>

      <div className="mt-3 text-sm text-gray-700 leading-relaxed pr-2">
        <p className="text-sm">{description}</p>
      </div>

      <time
        className="block text-xs text-gray-400 mt-1"
        dateTime={time}
        title={time}
      >
        {time}
      </time>

      <div className="mb-3 flex items-center justify-end gap-2">
        <button
          onClick={handleView}
          aria-label="View"
          className="flex items-center justify-center px-3 py-2 hover:bg-gray-50 transition"
        >
          <Eye size={16} />
        </button>

        <button
          onClick={() => onEdit?.(id)}
          aria-label="Edit"
          className="flex items-center justify-center px-3 py-2 hover:bg-gray-50 transition"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={() => onDelete?.(id)}
          aria-label="Delete"
          className="flex items-center justify-center px-3 py-2 hover:bg-red-50 transition text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
};

export default NewsCard;
