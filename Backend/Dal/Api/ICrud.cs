using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface ICrud<T>
    {
        Task Create(T item);
        Task<List<T>> Read();
        Task Delete(T item);
        Task UpDate(T item);
    }
}
