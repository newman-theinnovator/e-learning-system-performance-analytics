import { useState } from 'react';
import { forumPosts } from '../data/mockData';
import { MessageSquare, ThumbsUp } from 'lucide-react';

export default function ForumPage() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const post = forumPosts.find(p => p.id === selectedPost);

  if (post) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <button onClick={() => setSelectedPost(null)} className="text-sm text-blue-600 font-medium">← Back to Forum</button>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${post.authorRole === 'lecturer' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
              {post.authorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{post.authorName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${post.authorRole === 'lecturer' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{post.authorRole}</span>
                <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString('en-NG')}</span>
              </div>
              <h2 className="text-xl font-bold mt-2">{post.title}</h2>
              <p className="text-sm text-gray-700 mt-3 whitespace-pre-line leading-relaxed">{post.content}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-600"><ThumbsUp className="w-4 h-4" /> {post.likes}</button>
                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {post.replies.length} replies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-600 text-sm">{post.replies.length} Replies</h3>
          {post.replies.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 ml-6">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${r.authorRole === 'lecturer' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                  {r.authorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{r.authorName}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${r.authorRole === 'lecturer' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.authorRole}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{r.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-blue-600"><ThumbsUp className="w-3 h-3" /> {r.likes}</button>
                    <span>{new Date(r.createdAt).toLocaleDateString('en-NG')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 ml-6">
            <textarea className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Write a reply..." />
            <div className="flex justify-end mt-2">
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">Reply</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Discussion Forum</h1>
          <p className="text-gray-500 text-sm">{forumPosts.length} discussions</p>
        </div>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">+ New Discussion</button>
      </div>

      <div className="space-y-3">
        {forumPosts.map(p => (
          <div key={p.id} onClick={() => setSelectedPost(p.id)} className={`bg-white rounded-xl border shadow-sm p-5 cursor-pointer hover:shadow-md transition-all ${p.isPinned ? 'border-amber-200 bg-amber-50/20' : 'border-gray-100'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${p.authorRole === 'lecturer' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                {p.authorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {p.isPinned && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">📌 Pinned</span>}
                  <span className="text-xs text-gray-400">{p.authorName} • {new Date(p.createdAt).toLocaleDateString('en-NG')}</span>
                </div>
                <h3 className="font-semibold mt-1">{p.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.content}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">❤️ {p.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {p.replies.length} replies</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
