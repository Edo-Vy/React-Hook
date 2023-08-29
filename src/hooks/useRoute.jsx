// rfc
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function useRoute() {

    const navigate = useNavigate();
    const params = useParams();
    const [search, setSearch] = useSearchParams();

  return { navigate, params, searchPrams:[search, setSearch] };
  
}


/**  custom hook : là hook do react cho phép người dùng định nghĩa 
 * Cách tạo hook ~ component function nhưng điểm khác biệt là hook return về 1 giá trị ( có thể là ob, arr,
 *  number, string,..),
 * còn component function sẽ return về JSX ( là 1 đoạn giao diện ).
 * Cách đặt tên hook là đặt chữ : use__ đầu tiên
 * 
 * Logic nào lặp đi lặp lại thì có thể viết thành hook
 * 
 */
/**
 *  Nguyên tắc dùng useRoute
 * - Đặt chữ use__ đầu tiên ( useRoute )
 * - sử dụng ở đầu component
 * - không sử dụng if...else
 * - không để trong các hàm khác
 * 
 */