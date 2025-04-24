import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Companyschema from "../schema/MerchantSchema";
import createMerchant from "../services/MerchantService";
import { toast } from "react-toastify";


type TMerchantScehma = z.infer<typeof Companyschema>;

const MerchantForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TMerchantScehma>({ resolver: zodResolver(Companyschema) });

  const onSubmit = async (data: TMerchantScehma) => {
    try {
      console.log(data)
      const res = await createMerchant({ data });
      toast.success(res)
      reset();
    } catch (e: any) {
      toast.error(e.message)
    }

  }

  return (
    <div className="min-h-[75vh]  py-4 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl overflow-hidden">
        <div className="p-2">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-gray-800">
              Company Registration
            </h1>
            <p className="text-gray-600 text-sm">
              Please fill out the form below to register your company
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-3 py-1.5 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-3 py-1.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                type="text"
                {...register("phone")}
                className={`w-full px-3 py-1.5 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone.message}</p>}
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                type="text"
                {...register("city")}
                className={`w-full px-3 py-1.5 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-0.5">{errors.city.message}</p>}
            </div>

            {/* Country */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <input
                type="text"
                {...register("country")}
                className={`w-full px-3 py-1.5 rounded-lg border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
              />
              {errors.country && <p className="text-red-500 text-xs mt-0.5">{errors.country.message}</p>}
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Address *</label>
              <input
                type="text"
                {...register("address")}
                className={`w-full px-3 py-1.5 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-0.5">{errors.address.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full px-3 py-1.5 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`w-full px-3 py-1.5 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-0.5">{errors.confirmPassword.message}</p>}
            </div>

            {/* File Upload */}
            <div className="col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700">Company Logo (Optional)</label>
              <div className={`flex items-center justify-center w-full border ${errors.image ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-lg p-3 text-sm`}>
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-xs text-gray-600">Upload a file or drag and drop</p>
                  <input
                    type="file"
                    {...register("image")}
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                  />
                  <label htmlFor="file-upload" className="mt-1 inline-flex items-center px-2.5 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 cursor-pointer">
                    Select File
                  </label>
                </div>
              </div>
              {errors.image && <p className="text-red-500 text-xs mt-0.5">{errors.image?.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm text-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Register Company'}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>

  );
};

export default MerchantForm;