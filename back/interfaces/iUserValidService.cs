using back.DTO;
using Microsoft.AspNetCore.Mvc;

namespace back.interfaces
{
    public interface iUserService
    {
        public bool isValidDataUser(clientDTO user);
    }
}