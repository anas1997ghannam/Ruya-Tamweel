// "use client";
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Stack,
//   Pagination,
//   Skeleton,
// } from "@mui/material";
// import { formatDistanceToNow } from "date-fns";
// import { ar } from "date-fns/locale";

// interface Article {
//   _id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   authorId: {
//     fullName: string;
//   };
// }

// interface ArticlesProps {
//   filterByUserId?: string | null;
// }

// const Articles = ({ filterByUserId }: ArticlesProps) => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     const fetchArticles = async () => {
//       setLoading(true);
//       try {
//         const query = new URLSearchParams({
//           page: page.toString(),
//           limit: limit.toString(),
//         });
//         if (filterByUserId) query.append("userId", filterByUserId);

//         const res = await fetch(`/api/articles?${query.toString()}`);
//         const data = await res.json();
//         setArticles(data.articles || []);
//         setTotalPages(Math.ceil((data.total || 0) / limit));
//       } catch (error) {
//         console.error("فشل في جلب المقالات:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, [page, filterByUserId]);

//   return (
//     <Box>
//       {loading ? (
//         Array.from({ length: 3 }).map((_, i) => (
//           <Skeleton key={i} height={120} sx={{ my: 2 }} variant="rounded" />
//         ))
//       ) : articles.length === 0 ? (
//         <Typography textAlign="center" mt={4}>
//           لا توجد مقالات للعرض حاليًا.
//         </Typography>
//       ) : (
//         articles.map((article) => (
//           <Card key={article._id} sx={{ mb: 3, direction: "rtl" }}>
//             <CardContent>
//               <Stack direction="row" justifyContent="space-between" mb={1}>
//                 <Typography variant="h6" fontWeight="bold">
//                   {article.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {formatDistanceToNow(new Date(article.createdAt), {
//                     addSuffix: true,
//                     locale: ar,
//                   })}
//                 </Typography>
//               </Stack>
//               <Typography variant="subtitle2" color="text.secondary" mb={1}>
//                 بقلم: {article.authorId?.fullName || "مستخدم مجهول"}
//               </Typography>
//               <Typography variant="body2" noWrap>
//                 {article.content}
//               </Typography>
//               <Button
//                 href={`/articles/${article._id}`}
//                 size="small"
//                 sx={{ mt: 1 }}
//               >
//                 اقرأ المزيد
//               </Button>
//             </CardContent>
//           </Card>
//         ))
//       )}

//       {totalPages > 1 && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={(_, val) => setPage(val)}
//             color="primary"
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Articles;
"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Pagination,
  Skeleton,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface Article {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: {
    fullName: string;
  };
}

interface ArticlesProps {
  filterByUserId?: string | null;
  refreshKey?: number;
}

const Articles = ({ filterByUserId, refreshKey }: ArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );
  const limit = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (filterByUserId) query.append("userId", filterByUserId!);

        const res = await fetch(`/api/articles?${query.toString()}`);
        const data = await res.json();
        setArticles(data.articles || []);
        setTotalPages(Math.ceil((data.total || 0) / limit));
      } catch (error) {
        console.error("فشل في جلب المقالات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, filterByUserId, refreshKey]);

  const toggleExpand = (id: string) => {
    setExpandedArticleId((prev) => (prev === id ? null : id));
  };

  return (
    <Box>
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height={120} sx={{ my: 2 }} variant="rounded" />
        ))
      ) : articles.length === 0 ? (
        <Typography textAlign="center" mt={4}>
          لا توجد مقالات للعرض حاليًا.
        </Typography>
      ) : (
        articles.map((article) => {
          const expanded = expandedArticleId === article._id;
          return (
            <Card
              key={article._id}
              sx={{
                mb: 3,
                direction: "rtl",
                transition: "all 0.3s ease",
                transform: expanded ? "scale(1.02)" : "scale(1)",
                boxShadow: expanded
                  ? "0 0 15px rgba(0, 188, 212, 0.4)"
                  : undefined,
              }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="h6" fontWeight="bold">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                      locale: ar,
                    })}
                  </Typography>
                </Stack>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  بقلم: {article.authorId?.fullName || "مستخدم مجهول"}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {expanded
                    ? article.content
                    : ` ${article.content.slice(0, 120)}...`}
                </Typography>
                <Button
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => toggleExpand(article._id)}
                >
                  {expanded ? "إخفاء" : "اقرأ المزيد"}
                </Button>
              </CardContent>
            </Card>
          );
        })
      )}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default Articles;
