// app/components/article/[id]/Articles.tsx
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
import EditArticleDialog from "../../dialogs/EditArticleDialog";
import DeleteArticleDialog from "../../dialogs/DeleteArticleDialog";

interface Article {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: {
    fullName: string;
  };
}

interface Props {
  userId: string;
}

const MyArticles = ({ userId }: Props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deletingArticleId, setDeletingArticleId] = useState<string | null>(
    null
  );
  const limit = 10;

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        userId,
      });

      const res = await fetch(`/api/articles/mine?${query.toString()}`);
      const data = await res.json();
      setArticles(data.articles || []);
      setTotalPages(Math.ceil((data.total || 0) / limit));
    } catch (error) {
      console.error("فشل في جلب المقالات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page]);

  return (
    <Box>
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height={120} sx={{ my: 2 }} variant="rounded" />
        ))
      ) : articles.length === 0 ? (
        <Typography textAlign="center" mt={4}>
          لم تقم بإضافة أي مقالات بعد.
        </Typography>
      ) : (
        articles.map((article) => (
          <Card key={article._id} sx={{ mb: 3, direction: "rtl" }}>
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
              <Typography variant="body2" noWrap>
                {article.content}
              </Typography>
              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setEditingArticle(article)}
                >
                  تعديل
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => setDeletingArticleId(article._id)}
                >
                  حذف
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
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

      {/* تعديل المقال */}
      {editingArticle && (
        <EditArticleDialog
          open={Boolean(editingArticle)}
          onClose={() => setEditingArticle(null)}
          article={editingArticle}
          onUpdated={fetchArticles}
        />
      )}
      {/* حذف المقال */}
      {deletingArticleId && (
        <DeleteArticleDialog
          open={Boolean(deletingArticleId)}
          onClose={() => setDeletingArticleId(null)}
          articleId={deletingArticleId}
          onDeleted={fetchArticles}
        />
      )}
    </Box>
  );
};

export default MyArticles;
