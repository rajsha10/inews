'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';
import PostItemOne from '@/components/PostItemOne';

interface PostItem {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  avatar: string;
  author: string;
}

export default function Post() {
  const router = useRouter();
  const [items, setItems] = useState<PostItem[]>([]);
  const [item, setItem] = useState<PostItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getItemsData = async () => {
    try {
      const res = await fetch(`/api/postitems`);
      if (!res.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
      // setError(e.message);
    }
  };

  const getSinglePostData = async (id: string) => {
    try {
      const res = await fetch(`/api/postitems/${id}`);
      if (res.status === 404) {
        router.push('/not-found');
        return;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch the post');
      }
      const data = await res.json();
      setItem(data);
    } catch (e) {
      console.error(e);
      // setError(e.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getItemsData();
      await getSinglePostData('66f5c770dc00eda261fec48f');
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id='posts' className='posts'>
      <div className="container" data-aos='fade-up'>
        <div className="row g-5">
          <div className="col-lg-4">
            {item && <PostItemOne large={true} item={item} />}
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                {items.length > 0 && items.map((item) => (
                  <PostItemOne key={item._id} large={false} item={item} />
                ))}
              </div>
              <div className="col-lg-4"></div>
              <div className="col-lg-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
