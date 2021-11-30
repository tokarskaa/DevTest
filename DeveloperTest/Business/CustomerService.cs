using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeveloperTest.Business.Interfaces;
using DeveloperTest.Database;
using DeveloperTest.Database.Models;
using DeveloperTest.Models;

namespace DeveloperTest.Business
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext context;

        public CustomerService(ApplicationDbContext _context)
        {
            context = _context;
        }

        public CustomerModel[] GetCustomers()
        {
            return context.Customers.Select(x => new CustomerModel
            {
                Id = x.Id,
                Type = x.Type.ToString(),
                Name = x.Name
            }).ToArray();
        }
    }
}
